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

import { EmailObserver } from "./Email_Observer";
import { MobileObserver } from "./Mobile_Observer";
import { YouTubeNotification } from "./YouTubeNotifi";

//subject instance
const YTNotification = new YouTubeNotification();

//observer instance
const rohitMail = new EmailObserver("rohit@gmail.com");
const rohitMobile = new MobileObserver(5678677886);

YTNotification.subscribe(rohitMail);
YTNotification.subscribe(rohitMobile);

