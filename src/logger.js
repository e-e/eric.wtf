const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

module.exports = {
  app: null,
  init(app) {
    const logsDir = path.join(__dirname, "..", "logs");
    console.log("LOGS DIR", logsDir);
    const logPath = path.join(logsDir, "access.log");
    this.app = app;
    this.app.use(
      morgan("dev", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      })
    );

    // create log file if it doesn't exist
    if (!fs.existsSync(logPath)) {
      console.log("logs path!", logPath);
      fs.mkdirSync(logsDir, { recursive: true });
      fs.closeSync(fs.openSync(logPath, "w"));
    } else {
      console.log("file exists?");
    }

    // log all requests to access.log
    this.app.use(
      morgan("common", {
        stream: fs.createWriteStream(logPath, {
          flags: "a",
        }),
      })
    );
  },
};
