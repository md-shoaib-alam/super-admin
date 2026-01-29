// User roles
export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student';

// User status
export type UserStatus = 'active' | 'inactive';

// School status
export type SchoolStatus = 'active' | 'inactive';

// Subscription plans
export type SubscriptionPlan = 'basic' | 'premium' | 'enterprise';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string | null;
  schoolName?: string;
  status: UserStatus;
  avatar?: string;
  joinedDate: string;
  phone?: string;
  address?: string;
}

// School interface
export interface School {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  principalName: string;
  studentCount: number;
  teacherCount: number;
  establishedDate: string;
  status: SchoolStatus;
  subscription: SubscriptionPlan;
  logo?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalSchools: number;
  totalUsers: number;
  totalStudents: number;
  totalRevenue: number;
  schoolsGrowth: number;
  usersGrowth: number;
  studentsGrowth: number;
  revenueGrowth: number;
}

// Chart data
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Activity log
export interface ActivityLog {
  id: string;
  type: 'school_added' | 'user_added' | 'school_updated' | 'user_updated' | 'subscription_changed';
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

// Filter options
export interface FilterOptions {
  search?: string;
  status?: SchoolStatus | UserStatus;
  role?: UserRole;
  subscription?: SubscriptionPlan;
  schoolId?: string;
}

// Student interface
export interface Student {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  class: string;
  rollNumber: string;
  dateOfBirth: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  avatar?: string;
  status: UserStatus;
  enrollmentDate: string;
  address: string;
  bloodGroup?: string;
  emergencyContact?: string;
}

// Student Academic Record
export interface AcademicRecord {
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  term: string;
  year: string;
}

// Attendance Record
export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

// Parent interface
export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: 'father' | 'mother' | 'guardian';
  occupation?: string;
  address: string;
  studentIds: string[];
  students?: Student[];
  avatar?: string;
  status: UserStatus;
  registeredDate: string;
}

// Parent Meeting
export interface ParentMeeting {
  id: string;
  parentId: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  purpose: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}
