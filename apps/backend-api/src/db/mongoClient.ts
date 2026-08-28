import { MongoClient as MongoDriverClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27018/ai_customer_support';

export class MongoClient {
  private static isConnected = false;
  private static client: MongoDriverClient | null = null;

  public static async connect(): Promise<boolean> {
    try {
      console.log(`[MongoDB] Connecting to ${MONGO_URI}...`);
      this.client = new MongoDriverClient(MONGO_URI);
      await this.client.connect();
      this.isConnected = true;
      console.log(`[MongoDB] Connection established successfully.`);
      return true;
    } catch (error) {
      console.warn(`[MongoDB] Could not connect to Mongo URI. Falling back to operational in-memory data store. Error:`, error);
      this.isConnected = false;
      return false;
    }
  }

  public static getStatus() {
    return {
      connected: this.isConnected,
      uri: MONGO_URI,
      database: 'ai_customer_support'
    };
  }

  public static getDb() {
    if (!this.client) return null;
    return this.client.db();
  }
}
