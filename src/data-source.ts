import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
type: 'postgres',

host: "localhost",
port: 5445,

username: "admin",
password: 'admin123',
database: 'orquesta_db',

entities: [__dirname + '/**/*.entity{.ts,.js}'],

migrations: [__dirname + '/migrations/*{.ts,.js}'],

synchronize: false,
logging: true,
});
