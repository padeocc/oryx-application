'use node';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEnvConfig } from '@next/env';
import { User } from './entities/User';
import { Favorite } from './entities/Favorite';
import { AutoMigration1762168956663 } from './migrations/1762168956663-AutoMigration';

let options: DataSourceOptions;
const entities = [Favorite, User];
const migrations = [AutoMigration1762168956663];

if (!process.env.POSTGRES_URL) {
    const projectDir = process.cwd();
    loadEnvConfig(projectDir, true);
    options = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.PGPORT || ''),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
        entities,
        migrations,
        logging: false,
        synchronize: false,
        migrationsRun: false
    };
} else {
    options = {
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        entities,
        migrations,
        logging: false,
        synchronize: false,
        migrationsRun: false,
        ssl: {
            rejectUnauthorized: false,
            // Prevent Error: self-signed certificate in certificate chain
            allowPartialTrustChain: true
        }
    };
}


const dataSourceOptions: DataSourceOptions = options;

const AppDataSource = new DataSource({
    ...dataSourceOptions,
});

export default AppDataSource;
;