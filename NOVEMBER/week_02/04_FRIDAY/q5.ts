interface Database {
  save(data: string): void;
}

class MySQLService implements Database {
  save(data: string) {
    console.log("Saving to MySQL:", data);
  }
}

class UserService {
  constructor(private db: Database) {}

  register(user: string) {
    this.db.save(user);
  }
}
