import "dotenv/config";
import Fastify from "fastify";
import v1 from "./v1/execute.js";

const fastify = Fastify( {
    logger: true,
    trustProxy: true
});

v1(fastify, "/api/v1/execute");

fastify.listen( { port: Number(process.env.PORT) || 3000 });