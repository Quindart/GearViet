import { createServer } from "http";
import app from "../src/app.js";

export default function handler(req, res) {
    const server = createServer((req_, res_) => app(req_, res_));
    server.emit("request", req, res);
}
