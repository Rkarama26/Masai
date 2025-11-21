class LoggerSingleton {
  static #loggerInstance: LoggerSingleton;

  // private : to prevent creating instances
  private constructor() {}

  static getInstance(): LoggerSingleton {
    if (!LoggerSingleton.#loggerInstance) {
      LoggerSingleton.#loggerInstance = new LoggerSingleton();
    }

    return LoggerSingleton.#loggerInstance;
  }
}


const obj1 = LoggerSingleton.getInstance();
const obj2 = LoggerSingleton.getInstance();

if(obj1 === obj2){
    console.log("Both are same ")
} else{
    console.log("Both are not same")
}