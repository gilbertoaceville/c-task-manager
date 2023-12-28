export interface Task {
  title: string;
  date: string;
  description: string;
  isDone?: boolean;
  isPriority?: boolean;
  userId?: string;
}
