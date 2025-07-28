/*
Create a function timer that takes a 
duration in milliseconds and a callback 
function onComplete. The function should 
use setTimeout to simulate a countdown,
 and when the timer ends, it should execute
  the onComplete callback with a message: 
  "Timer of <duration> ms finished".

*/


function timer(duration, onComplete) {
  setTimeout(() => {
    const message = `Timer of ${duration} ms finished`;
    onComplete(message);
  }, duration);
}


timer()