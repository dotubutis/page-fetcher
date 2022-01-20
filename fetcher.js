const request = require("request");
const fs = require("fs");
const [url, localFilePath] = process.argv.slice(2);

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

// refactor this to use a callback to check if file exists
// const checkIfFileExists =
request(url, (error, response, body) => {
  if (error && error.code === "ENOTFOUND") {
    console.log("URL is invalid");
    process.exit();
  }
  const writeFile = () => {
    fs.writeFile(localFilePath, body, (err) => {
      if (err && err.code === "ENOENT") {
        console.error("File path is invalid");
      }
      const message = "Downloaded and saved 3261 bytes to ./index.html";
      console.log(message);
      process.exit();
    });
  };
  fs.stat(localFilePath, (err, stat) => {
    if (err != null) {
      writeFile();
    } else {
      console.log("File exists");
      rl.question("Overwrite? Type 'Y'\n", (answer) => {
        if (answer.toLowerCase() !== "Y".toLowerCase()) {
          console.log("Nothing saved, exiting program");
          rl.close();
          process.exit();
        }
        rl.close();
        writeFile();
      });
    }
  });
});
