```bash
# Create and enter project folder
mkdir my-node-app
cd my-node-app

# Initialize package.json
npm init -y

# Enable ES Modules
npm pkg set type="module"

# Install Express
npm install express

# Install nodemon
npm install --save-dev nodemon

# Create server.js
@'
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
'@ | Set-Content server.js

# Add scripts
npm pkg set scripts.start="node src/server.js"
npm pkg set scripts.dev="nodemon src/server.js"

# Run development server
npm run dev