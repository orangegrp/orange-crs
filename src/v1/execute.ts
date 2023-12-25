import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const PISTON_API = "http://piston:2000/api/v2/execute";

const fastify_request_schema = {
    body: {
        properties: {
            code: { type: "string" },
            lang: { type: "string" },
            stdin: { type: "string" },
            args: { type: "array", items: { type: "string" } }
        },
        required: ["code", "lang"],
    }
}

type request_schema = {
    code: string,
    lang: string,
    stdin?: string,
    args?: string[]
}

type reply_schema = {
    id: string,
    data: any
}

function random_id() {
    return crypto.randomBytes(4).toString("hex");
}

function post(req: FastifyRequest, reply: FastifyReply) {
    if (!(process.env.JWT_SECRET_V1)) {
        reply.status(503).send();
        return;
    }

    if (!(req.headers.authorization)) {
        reply.status(400).send();
        return;
    }

    if (!jwt.verify(req.headers.authorization, process.env.JWT_SECRET_V1)) {
        reply.status(403).send();
        return;
    }

    if (req.headers["content-type"] !== "application/json") {
        reply.status(400).send();
        return;
    }

    try {
        const request_info: request_schema = JSON.parse(req.body as string);
        const exec_id = random_id();

        fetch(PISTON_API, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: request_info.lang,
                version: '*',
                files: [{ name: exec_id, content: request_info.code }],
                stdin: request_info.stdin,
                args: request_info.args
            })
        }).then(resp => {
            reply.status(200).send({ id: exec_id, data: resp.json() } as reply_schema);
        }).catch(() => {
            reply.status(500).send();
        });
    } catch {
        reply.status(500).send();
        return;
    }
}

export default function (fastify: FastifyInstance, path: string, opts?: RouteShorthandOptions) {
    fastify.post(path, { schema: fastify_request_schema }, post);
}