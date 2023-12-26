import "dotenv/config";
import Fastify from "fastify";
import v1 from "./v1/execute.js";

const fastify = Fastify( {
    logger: true,
    trustProxy: true
});

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == "production") {
    console.log('Production mode, setting error handler to emit 500 and not found to 404 (no details).');
    fastify.setErrorHandler((error, _request, reply) => {
        console.dir(error);
        reply.status(500).send();
    });
    fastify.setNotFoundHandler((_request, reply) => {
        reply.status(404).send();
    });
}

v1(fastify, "/api/v1/execute");

fastify.listen( { port: Number(process.env.PORT) || 3000, host: "0.0.0.0" } );