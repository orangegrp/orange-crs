import "dotenv/config";
import Fastify from "fastify";
import v1 from "./v1/execute";

const fastify = Fastify( {
    logger: true,
    trustProxy: true
});

v1(fastify, "/api/v1/execute");