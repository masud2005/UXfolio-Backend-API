
import { Server } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { envVars } from './app/config/env';

dotenv.config();

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("Connect to DB!");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening on port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();


// Termination signal
process.on("SIGTERM", (err) => {
    console.log("SIGTERM signal received... Server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

// Interrupt Signal
process.on("SIGINT", (err) => {
    console.log("SIGINT signal received... Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

// Unhandled Rejection Handle
process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection detected... Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }

    process.exit(1);
})
// Promise.reject(new Error("I forgot to catch this promise"));

// Uncaught Exception Handle
process.on("uncaughtException", (err) => {
    console.log("Uncaught exception detected... Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})
// throw new Error("I forgot to handle this local error");