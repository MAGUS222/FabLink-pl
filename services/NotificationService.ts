import { Notification } from '../types';

class NotificationService {
  private notifications: Notification[] = [];

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('fablink_notifications');
    if (saved) {
      this.notifications = JSON.parse(saved);
    }
  }

  private save() {
    localStorage.setItem('fablink_notifications', JSON.stringify(this.notifications));
  }

  public async sendNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read' | 'emailSent'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      read: false,
      emailSent: true // Simulate email sending
    };

    this.notifications.unshift(newNotification);
    this.save();
    
    // Simulate API call to email provider
    console.log(`[Email Sent] To: ${notification.recipientEmail}, Subject: ${notification.title}`);
    
    return newNotification;
  }

  public getNotifications() {
    return this.notifications;
  }

  public markAsRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.save();
  }
}

export const notificationService = new NotificationService();
