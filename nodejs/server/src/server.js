import express from "express";

const app = express();
const port = process.env.PORT || 3055;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// graceful shutdown
async function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down...`);

  server.close(async () => {
    console.log("HTTP server closed ✅");

    // close DB connections here
    // await mongoose.connection.close()

    // save logs here
    // await saveLogs()

    console.log("Cleanup completed ✅");

    process.exit(0);
  });
}

// Ctrl + C
process.on("SIGINT", () => shutdown("SIGINT"));

// Docker / PM2 / hosting shutdown
process.on("SIGTERM", () => shutdown("SIGTERM"));

// unexpected sync errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// unexpected async errors
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});