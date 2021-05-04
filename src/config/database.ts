import {ConnectionOptions} from 'typeorm'
import { User, Category, Product } from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgresmarketless",
  database: process.env.POSTGRES_DB || "marketless",
  entities: [User, Category, Product],
  synchronize: true,
}

export default config