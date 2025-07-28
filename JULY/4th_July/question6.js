
/*
Steps:

Define timer that accepts duration and onComplete.
Use setTimeout to delay for duration, then call onComplete with the finish message.
*/


function timer(duration, callback){
  setTimeout(() => {
    callback(`Timer of ${duration} ms finished`)
  }, duration)
}
function onComplete(message){
  console.log(message)
}

timer(1000, onComplete);
