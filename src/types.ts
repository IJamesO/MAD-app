export type Role = 'student' | 'staff' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  lecturer: string;
  progress: number;
  grade?: string;
  status: 'current' | 'completed';
  studentCount?: number;
}

export interface TimetableEntry {
  id: string;
  subject: string;
  room: string;
  lecturer: string;
  startTime: string;
  endTime: string;
  day: string;
  color: string;
}

export interface Grade {
  course: string;
  assignment: string;
  score: number;
  grade: string;
  feedback: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'announcement' | 'direct';
}

export interface StudentProfile {
  id: string;
  name: string;
  course: string;
  performance: 'Excellent' | 'Good' | 'Average' | 'Poor';
}
