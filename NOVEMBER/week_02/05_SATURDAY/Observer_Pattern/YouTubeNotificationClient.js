"use strict";
/*
Requirements:
 Subject
 Observer
  list of observers
Notification
SOLID principles
Observer Pattern
Loose Coupling
*/
Object.defineProperty(exports, "__esModule", { value: true });
const Email_Observer_1 = require("./Email_Observer");
const Mobile_Observer_1 = require("./Mobile_Observer");
const YouTubeNotifi_1 = require("./YouTubeNotifi");
//subject instance
const YTNotification = new YouTubeNotifi_1.YouTubeNotification();
//observer instance
const rohitMail = new Email_Observer_1.EmailObserver("rohit@gmail.com");
const rohitMobile = new Mobile_Observer_1.MobileObserver(5678677886);
YTNotification.subscribe(rohitMail);
YTNotification.subscribe(rohitMobile);
//# sourceMappingURL=YouTubeNotificationClient.js.map