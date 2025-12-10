export interface Notification {
  id: number;
  id_user: number;
  employeeId: number | null;
  title: string;
  message: string;
  typeNotifycation: 'INFO' | 'WARNING' | 'ERROR' | string;
  read: boolean;
  createdAt: string; 
}