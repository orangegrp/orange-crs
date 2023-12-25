import "dotenv/config";
import Fastify from "fastify";
import v1 from "./v1/execute.js";

const fastify = Fastify( {
    logger: true,
    trustProxy: true
});

fastify.setErrorHandler((error, _request, reply) => {
    console.dir(error);
    reply.status(500).send();
});

v1(fastify, "/api/v1/execute");

fastify.listen( { port: Number(process.env.PORT) || 3000 });