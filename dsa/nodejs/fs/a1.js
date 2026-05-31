const path = require("path");
const fs = require("fs/promises");

const filePath = path.join(__dirname, "..", "..", "files");

const rootPath = path.join(__dirname, "..", "..", "..", "nodejs");

// fs.readFile
const handleReadingTextFile = async () => {
  try {
    const filePath = path.join(__dirname, "..", "..", "/files", "text.txt");
    console.log(filePath, "filePath");
    const result = await fs.readFile(filePath, "utf8");
    console.log(result, "buffer : handleReadingTextFile");
  } catch (err) {
    console.error(err);
  }
};
// handleReadingTextFile();

// fs.readdir
const handleReadDir = async (dir) => {
  try {
    const items = await fs.readdir(dir, {
      withFileTypes: true,
    });
    console.log(items, "items");

    for (let item of items) {
      const fullPath = path.join(dir, item.name);

      console.log(fullPath, "fullPath");

      if (item.isDirectory()) {
        // console.log("DIR:", fullPath);

        await handleReadDir(fullPath);
      }

      if (item.isFile()) {
        console.log("FILE:", fullPath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// handleReadDir(filePath);

// fd.read
const handleRead = async () => {
  let fd = null;
  try {
    const filePath = path.join(__dirname, "..", "..", "files", "text.txt");
    console.log(filePath, "filePath 1");
    fd = await fs.open(filePath, "r");
    if (fd) {
      const buffer = Buffer.alloc(20);
      const { buffer: readBuffer, bytesRead } = await fd.read(buffer, 0, 20, 0);
      console.log(fd, "fd");
      console.log(readBuffer.toString(), "readBuffer");
      console.log(bytesRead, "bytesRead");
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (fd) {
      fd.close();
      console.log(fd, "fd");
    }
  }
};
// handleRead();

// read a json file
let userData = null;

const handleReadUserData = async () => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "dsa",
    "files",
    "userData.json",
  );

  try {
    // load only once
    if (!userData) {
      const data = await fs.readFile(filePath, "utf-8");

      // parse JSON array
      const parsedData = JSON.parse(data);

      // store in Map using id as key
      userData = new Map(parsedData.map((user) => [user.id, user]));
    }

    return userData;
  } catch (error) {
    console.error("Error reading user data:", error);
    return null;
  }
};

// example usage
(async () => {
  const users = await handleReadUserData();

  if (users) {
    console.log(users.get(1));
    console.log(users.size);
  }
})();
