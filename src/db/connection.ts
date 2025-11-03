import { DataSource } from 'typeorm';
import AppDataSource from './dataSource';

export const getDBConnection = async (): Promise<DataSource> => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
};