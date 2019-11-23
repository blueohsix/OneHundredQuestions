export class User {
  id: number;
  name: string;
  username: string;
  password: string;
  associateUsername: string;
  role: string;
  enabled: number;

  constructor(
    id?: number,
    name?: string,
    username?: string,
    password?: string,
    associateUsername?: string,
    role?: string,
    enabled?: number
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.associateUsername = associateUsername;
    this.role = role;
    this.enabled = enabled;
  }
}
