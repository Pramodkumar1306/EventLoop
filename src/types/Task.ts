export interface Task {
  id: string;
  name: string;
  type: 'sync' | 'async' | 'callback';
  duration?: number;
}