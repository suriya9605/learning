Here’s a clean setup for using ES Modules (Modern JavaScript) in a new Node.js project.

# Create and enter project folder
mkdir my-node-app
cd my-node-app

# Initialize package.json (with defaults)
npm init -y

# Edit package.json to use ES modules
npm pkg set type="module"

# Install dependencies (example: Express)
npm install express

# Install dev dependencies (example: nodemon for auto-restart)
npm install --save-dev nodemon

# Create main entry file
echo "const express = require('express'); const app = express(); const port = process.env.PORT || 3000; app.get('/', (req, res) => res.send('Hello World!')); app.listen(port, () => console.log(\`App running on port \${port}\`));" > server.js

# Create main entry file (server.js) with ES module syntax
@'
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from ES6 module!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
'@ | Set-Content server.js



# Add start scripts to package.json (manually or via command)
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"


# Run development server
npm run dev