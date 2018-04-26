
module.exports.connection = function (argv) {
  let args = { // Defaults
    db: {
      client: "pg",
      connection: {
        host : '137.49.38.134',
        user : 'web_anon',
        password : '1password1', // TODO: SECURE THIS IN PRODUCTION
        database : 'gargoyle'
      }
    }
  };

  argv.forEach((val, index) => {
    switch(val) {
      case "sqlite":
        args.db = {
          client: "sqlite3",
          connection: {
            filename: './db/localdata.db'
          },
          useNullAsDefault: true
        };
        break;
      default:
        break;
    }
  });

  return require('knex')(args.db);
}