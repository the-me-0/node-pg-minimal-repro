Minimal reproduction repository.
Issue link : [https://github.com/brianc/node-postgres/issues/3206](https://github.com/brianc/node-postgres/issues/3206)
Related to prisma, as this is my end goal here. Prisma added support for edge env recently, but their solution is limited to the node-postgres library working in this edge env too.

To start it, those commands are needed :
```bash
docker compose up -d
npm i
npx prisma migrate dev
npm run dev
```

In the console, as well as on [http://localhost:3000](http://localhost:3000) you should see the error pop.

```
Module not found: Can't resolve 'fs'
  74 |
  75 |   // Only try to load fs if we expect to read from the disk
> 76 |   const fs = config.sslcert || config.sslkey || config.sslrootcert ? require('fs') : null
     | ^
  77 |
  78 |   if (config.sslcert) {
  79 |     config.ssl.cert = fs.readFileSync(config.sslcert).toString()

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/pg/lib/connection-parameters.js
./node_modules/pg/lib/client.js
./node_modules/pg/lib/index.js
```

After some time, another error popped in the console, might be related :

```
 ⚠ ./node_modules/pg/lib/native/client.js
Module not found: Can't resolve 'pg-native' in '/home/phoenix/node-pg-minimal-repro/node_modules/pg/lib/native'

Import trace for requested module:
./node_modules/pg/lib/native/client.js
./node_modules/pg/lib/native/index.js
./node_modules/pg/lib/index.js
```