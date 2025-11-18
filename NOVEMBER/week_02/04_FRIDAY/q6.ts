interface PaymentStrategy {
  pay(amount: number): void;
}

class UpiPatment implements PaymentStrategy {
  private upiId: string;

  constructor(upiId: string) {
    this.upiId = upiId;
  }
  pay(amount: number): void {
    console.log(`Paying ${amount} using UPI ID ${this.upiId}.`);
  }
}

class CreditCardPayment implements PaymentStrategy {
  private creditCardNumber: string;

  constructor(creditCardNumber: string) {
    this.creditCardNumber = creditCardNumber;
  }

  pay(amount: number): void {
    console.log(`Paying ${amount} using Credit Card.`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;
  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }
  pay(amount: number): void {
    console.log(`Paying ${amount} using Bitcoin Wallet ${this.walletAddress}.`);
  }
}

class Payment {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  processPayment(amount: number) {
    this.strategy.pay(amount);
  }
}


const payment = new Payment(new CreditCardPayment("4444444444444444"));
payment.processPayment(1000);

payment.setStrategy(new BitcoinPayment("ckjsdhflasjdibgfadslikj"));
payment.processPayment(2000);

payment.setStrategy(new UpiPatment("UPID123456@bank"));
payment.processPayment(3000);

