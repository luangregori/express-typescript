import { ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User, Category, Product, Home } from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  // host: process.env.POSTGRES_HOST || "localhost",
  host: "159.65.169.134",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgresmarketless",
  database: process.env.POSTGRES_DB || "marketless",
  entities: [User, Category, Product, Home],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy()
}

export default config