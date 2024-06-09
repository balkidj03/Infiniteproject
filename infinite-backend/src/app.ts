import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./utils/logger";
import * as dotenv from "dotenv";
import connectDatabase from "./config/db";
import path from "path";

import http from "http";
import { Server, Socket } from "socket.io";

// user api
import userRoutes from "./routes/users";

dotenv.config();

let io: Server;

const main = async () => {
  // Connect to database
  await connectDatabase();
  logger.info("🚀 Connection has been established successfully.");

  // start app
  const app = express();

  // setup socket server
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "http://192.168.1.181:3000",
    },
  });

  // todo:
  // middleware for auth

  // Socket.io connection handling
  io.on("connection", (socket: Socket) => {
    console.log("Client connected");

    // Handle user joining room
    socket.on("joinRoom", (userId: string) => {
      socket.join(userId);
      console.log(`${userId} joined a room`);
    });

    // Example: Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  app.set("port", process.env.PORT || 5000);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Useful if you're behind a reverse proxy (Heroku, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // protects app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  // serve static file
  app.use("/media", express.static(path.join(__dirname, "../media")));

  // Load routes
  app.use("/api/v1/auth", userRoutes);

  app.get("/", (_req, res) => {
    res.json({
      status: true,
      message: "Server 404",
    });
  });

  // catch and handle 404 errors
  app.use((req, res, _next) => {
    if (req.accepts("json")) {
      return res.status(404).json({
        success: false,
        message: "Resource not found right now.",
      });
    }
    return res.end("Page not found.");
  });

  // error handlers
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    let httpStatusCode = err.httpStatusCode || 500;
    logger.error("[Handled Error] => ", err);
    res.status(httpStatusCode).json({
      success: false,
      message: err.message || "Something went wrong",
      data: err.data || {},
    });
  });

  server.listen(app.get("port"), () => {
    logger.info("🌐 Server ready at http://localhost:%d", app.get("port"));
  });
};

export { io };

export default main;
