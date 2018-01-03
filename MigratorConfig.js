const path = require('path');
const dbpath = path.join(__dirname, './content/data/ghost.db');
module.exports = {
  database: {
    client: 'sqlite3',
    connection: {
      filename: dbpath
    }
  },
  migrationPath: process.cwd() + '/core/server/data/migrations',
  currentVersion: 'your-current-database-version'
};
