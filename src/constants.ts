import { Course, Grade, Message, StudentProfile, TimetableEntry } from './types';

export const MOCK_STUDENT_COURSES: Course[] = [
  { id: '1', name: 'Advanced Mathematics', code: 'MTH401', lecturer: 'Dr. Sarah Jenkins', progress: 75, status: 'current' },
  { id: '2', name: 'Software Engineering', code: 'CS302', lecturer: 'Prof. Michael Chen', progress: 40, status: 'current' },
  { id: '3', name: 'Introduction to Psychology', code: 'PSY101', lecturer: 'Dr. Emily Watson', progress: 100, status: 'completed', grade: 'A' },
  { id: '4', name: 'Data Structures', code: 'CS201', lecturer: 'Dr. James Smith', progress: 60, status: 'current' },
];

export const MOCK_STAFF_COURSES: Course[] = [
  { id: 'CS101', name: 'Intro to Computer Science', code: 'CS101', lecturer: 'You', progress: 0, status: 'current', studentCount: 124 },
  { id: 'CS202', name: 'Database Systems', code: 'CS202', lecturer: 'You', progress: 0, status: 'current', studentCount: 86 },
  { id: 'CS303', name: 'Cloud Architecture', code: 'CS303', lecturer: 'You', progress: 0, status: 'current', studentCount: 42 },
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: '1', subject: 'Adv. Mathematics', room: 'Hall A', lecturer: 'Dr. Jenkins', startTime: '09:00', endTime: '11:00', day: 'Monday', color: 'border-l-teal-500' },
  { id: '2', subject: 'Software Eng.', room: 'Lab 4', lecturer: 'Prof. Chen', startTime: '13:00', endTime: '15:00', day: 'Monday', color: 'border-l-blue-500' },
  { id: '3', subject: 'Psychology', room: 'Room 202', lecturer: 'Dr. Watson', startTime: '10:00', endTime: '12:00', day: 'Tuesday', color: 'border-l-purple-500' },
  { id: '4', subject: 'Data Structures', room: 'Lab 1', lecturer: 'Dr. Smith', startTime: '14:00', endTime: '16:00', day: 'Wednesday', color: 'border-l-orange-500' },
];

export const MOCK_GRADES: Grade[] = [
  { course: 'Adv. Mathematics', assignment: 'Midterm Exam', score: 88, grade: 'A-', feedback: 'Excellent problem solving skills.' },
  { course: 'Software Engineering', assignment: 'Team Project 1', score: 92, grade: 'A', feedback: 'Great coordination and design.' },
  { course: 'Intro to Psychology', assignment: 'Final Essay', score: 85, grade: 'B+', feedback: 'Strong arguments, could use more citations.' },
];

export const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Dr. Jenkins', content: 'The assignment deadline has been extended by two days.', timestamp: '10:30 AM', type: 'announcement' },
  { id: '2', sender: 'Alice Cooper', content: 'Hey, do you want to study for the midterm tonight?', timestamp: 'Yesterday', type: 'direct' },
  { id: '3', sender: 'University Admin', content: 'Campus will be closed this Friday for maintenance.', timestamp: 'Monday', type: 'announcement' },
];

export const MOCK_STUDENTS: StudentProfile[] = [
  { id: 'S001', name: 'Alex Thompson', course: 'Computer Science', performance: 'Excellent' },
  { id: 'S002', name: 'Bella Riva', course: 'Computer Science', performance: 'Good' },
  { id: 'S003', name: 'Charlie Dean', course: 'Data Science', performance: 'Average' },
  { id: 'S004', name: 'Diana Prince', course: 'Software Engineering', performance: 'Excellent' },
  { id: 'S005', name: 'Edward Norton', course: 'Computer Science', performance: 'Poor' },
];
