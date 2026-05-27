const path = require("path");
const fs = require("fs/promises");

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

handleReadingTextFile();

const handleReadDir = async (dir) => {
  try {
    const items = await fs.readdir(dir, {
      withFileTypes: true,
    });
    console.log(items , 'items')

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

const rootPath = path.join(__dirname, "..", "..", "..", "nodejs", "server");

handleReadDir(rootPath);
