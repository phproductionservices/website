export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  sales?: string;
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
}

export interface Ticket {
  id: number;
  type: string;
  price: number;
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  dateAdded: string;
}