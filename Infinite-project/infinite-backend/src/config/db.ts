import { ConnectOptions, connect } from "mongoose";
import { logger } from "../utils/logger";

import * as dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
  try {
    const options: ConnectOptions = {
      retryWrites: true,
      w: "majority",
      autoIndex: true, // Don't build indexed
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    const DATABASE_URL: string = `${process.env.DATABASE_URL}`;

    await connect(DATABASE_URL, options);
  } catch (err: any) {
    logger.error(err.message);
    process.exit(1);
  }
};

export default connectDatabase;
