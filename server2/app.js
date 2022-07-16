
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path';
import router from './routes.js'

const app = express()
const _dirname = path.resolve();

app.use(express.json());

app.use(cors());

app.use(express.static(`${_dirname}/public`))
app.use(express.urlencoded({ extended: true }));

app.use(router)

const start = async () => {
  import("./db-config.js")
  const port = process.env.PORT || 8000
  app.listen(process.env.PORT, () => {
    console.log(`server is listening on http://localhost:${port}`)
  })
}

start()