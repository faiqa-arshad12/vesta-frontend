/**
 * Mock user database for login only (development)
 * Replace with actual backend API when ready
 */

interface MockUser {
  id: string;
  email: string;
  password: string;
  name?: string;
}

// Mock users for login testing
const users: MockUser[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
];

/**
 * Verify user credentials for login
 */
export function verifyCredentials(email: string, password: string): MockUser | null {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return null;
  }
  return user;
}

