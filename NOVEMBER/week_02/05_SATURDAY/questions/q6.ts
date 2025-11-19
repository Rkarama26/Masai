// Observer interface
interface Observer {
  update(message: string): void;
}

// Smartphone class
class Smartphone implements Observer {
  update(message: string): void {
    console.log(`Smartphone received notification: ${message}`);
  }
}

// Tablet class
class Tablet implements Observer {
  update(message: string): void {
    console.log(`Tablet received notification: ${message}`);
  }
}

// NotificationCenter class
class NotificationCenter {
  private observers: Observer[] = [];

  // Attach an observer
  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  // Detach an observer
  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers
  notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

const notificationCenter = new NotificationCenter();

const smartphone = new Smartphone();
const tablet = new Tablet();

// Subscribe devices
notificationCenter.attach(smartphone);
notificationCenter.attach(tablet);

// Send a notification
notificationCenter.notify("New update available!");

// Unsubscribe tablet
notificationCenter.detach(tablet);

// Send another notification
notificationCenter.notify("Another update!");
