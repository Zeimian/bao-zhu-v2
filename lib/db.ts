import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// 创建 Neon 连接
const sql = neon(process.env.DATABASE_URL);

// 创建 Drizzle 实例
export const db = drizzle(sql, { schema });

// 导出 schema 和类型
export * from '../db/schema';
