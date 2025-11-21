/*
Build a NotificationFactory that creates objects for
 EmailNotification, SMSNotification, and PushNotification. 
 Each type should have a send(message: string) method with 
 different console outputs.
*/

interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Email Notification: ${message}`);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`SMS Notification: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Push Notification: ${message}`);
  }
}

class NotificationFactory {
  static createNotification(type: string): Notification {
    switch (type) {
      case "Email":
        return new EmailNotification();
      case "SMS":
        return new SMSNotification();
      case "Push":
        return new PushNotification();
      default:
        throw new Error("Invalid notification type");
    }
  }
}

const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!"); // Sending EMAIL: Welcome!

const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456"); // Sending SMS: Your OTP is 123456
