export type Schedule = {
  id: number;
  date: string; // ISO 8601（"yyyy-MM-dd"）
  title: string;
  description: string;
};

export type NewSchedule = Omit<Schedule, 'id'>;
