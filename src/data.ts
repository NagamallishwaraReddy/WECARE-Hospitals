import { Department, Doctor } from "./types";

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Expert care for your heart, from prevention to advanced surgical treatments.",
    icon: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1628177142898-93e46e462850?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Comprehensive diagnosis and treatment for brain and nervous system disorders.",
    icon: "Brain",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Compassionate healthcare for infants, children, and adolescents.",
    icon: "Baby",
    imageUrl: "https://images.unsplash.com/photo-1519494140681-8b17d07dc36a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Specialized care for bones, joints, ligaments, tendons, and muscles.",
    icon: "Bone",
    imageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "oncology",
    name: "Oncology",
    description: "Advanced cancer treatments and dedicated support for patients and families.",
    icon: "Activity",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "emergency",
    name: "Emergency Care",
    description: "24/7 critical care and emergency medical services for immediate life-saving support.",
    icon: "Ambulance",
    imageUrl: "https://images.unsplash.com/photo-1587745416622-539232f39d73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Jenkins",
    specialty: "Interventional Cardiologist",
    departmentId: "cardiology",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "15+ years",
    education: "MD, Harvard Medical School"
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    specialty: "Electrophysiologist",
    departmentId: "cardiology",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "12+ years",
    education: "MD, Stanford University"
  },
  {
    id: "d3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatric Neurologist",
    departmentId: "neurology",
    imageUrl: "https://images.unsplash.com/photo-1594824436951-7f12bc00bc87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "10+ years",
    education: "MD, Johns Hopkins University"
  },
  {
    id: "d4",
    name: "Dr. James Wilson",
    specialty: "Neurosurgery",
    departmentId: "neurology",
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "20+ years",
    education: "MD, Yale School of Medicine"
  },
  {
    id: "d5",
    name: "Dr. Olivia Taylor",
    specialty: "General Pediatrics",
    departmentId: "pediatrics",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "8+ years",
    education: "MD, Duke University"
  },
  {
    id: "d6",
    name: "Dr. William Barnes",
    specialty: "Orthopedic Surgeon",
    departmentId: "orthopedics",
    imageUrl: "https://images.unsplash.com/photo-1612270929237-775b8719f969?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "18+ years",
    education: "MD, Columbia University"
  },
  {
    id: "d7",
    name: "Dr. Amina Patel",
    specialty: "Surgical Oncologist",
    departmentId: "oncology",
    imageUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "14+ years",
    education: "MD, University of Pennsylvania"
  },
  {
    id: "d8",
    name: "Dr. Robert King",
    specialty: "Emergency Medicine",
    departmentId: "emergency",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127c0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    experience: "22+ years",
    education: "MD, UCSF"
  }
];
