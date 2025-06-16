export interface SensorData {
  id: number;
  created_at: string;
  temperature: number;
  humidity: number;
  moisture: number;
  light?: number;
}
