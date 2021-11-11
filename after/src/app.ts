
import express from 'express'
import { Server } from 'http';
import { createUserController } from './modules/users/useCases/createUser';

const app = express()
const port = 3000;

let server: Server;

app.get('/', (req, res) => createUserController.execute(req, res))

function start () {
  server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

function stop () {
  server.close();
}

export {
  start,
  stop
}