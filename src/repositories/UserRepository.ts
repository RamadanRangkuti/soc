export class UserRepository {
  private users: any[] = [];

  async save(userData: any) {
    this.users.push(userData);
    return { id: Date.now(), ...userData };
  }

  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}