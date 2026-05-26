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
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from ES6 module!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
'@ | Set-Content server.js

# Add scripts
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"

# Run development server
npm run dev