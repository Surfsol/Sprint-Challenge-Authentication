npm i supertest jest

Add: api/server.spec.js

package.json: "test": "jest --watch",

npm run server

database testing: 

Add to knexfile.js

testing: {
      client: 'sqlite3',
      connection: {
        filename: './database/test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',  //should match directory of migrations and seeds
      },
    },

migrate to create testing db
knex migrate:latest --env=testing

open in sql:
should see testing library and tables

Add .specs.js  file, to include tests