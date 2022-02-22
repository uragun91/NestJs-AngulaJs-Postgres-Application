import { DatabaseFileEntity } from './database-file.entyty';

export type DatabaseFileWithoutData = Omit<DatabaseFileEntity, 'data'>;
