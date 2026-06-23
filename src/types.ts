export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  imageUrl: string;
  experience: string;
  education: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export type ViewState = 'home' | 'about' | 'departments' | 'doctors' | 'appointment' | 'auth' | 'profile';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: number;
}

export interface Appointment {
  id?: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  departmentId: string;
  doctorId: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: number;
}
