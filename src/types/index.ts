export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  role: 'student' | 'tutor' | 'admin';
}

export interface Subject {
    name: string;
}

export interface Offer {
  id: string;
  subject: Subject;
  description: string;
  user: { name: string };
  type: 'help' | 'request';
}

export interface Event {
  id: string;
  title: string;
  scheduled_for: string;
  organizer: { name: string };
  description: string;
}

export type EventCreationData = Omit<Event, 'id' | 'organizer'>;

export interface Resource {
    id: string;
    title: string;
    subject: Subject;
    added_by: { name: string };
}
