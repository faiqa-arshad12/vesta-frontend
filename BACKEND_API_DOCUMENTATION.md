# Backend API Documentation for Authentication

This document describes the authentication API endpoints that the frontend expects from the backend.

## Base URL

The frontend uses the `NEXT_PUBLIC_API_URL` environment variable to determine the backend API URL. If not set, it defaults to `http://localhost:3001`.

## Authentication Endpoints

### 1. User Sign Up

**Endpoint:** `POST /api/auth/signup`

**Description:** Creates a new user account.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword123"
}
```

**Request Body Schema:**
- `email` (string, required): Valid email address
- `password` (string, required): Password with minimum 6 characters

**Success Response:**

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "id": "user-id-123",
  "email": "user@example.com",
  "name": "User Name" // Optional, defaults to email if not provided
}
```

**Error Response:**

**Status Code:** `400 Bad Request` or `409 Conflict`

**Response Body:**
```json
{
  "message": "Email already exists" // or other error message
}
```

**Error Status Codes:**
- `400`: Invalid input (e.g., invalid email format, password too short)
- `409`: Email already registered
- `500`: Internal server error

---

### 2. User Sign In

**Endpoint:** `POST /api/auth/signin`

**Description:** Authenticates a user and returns user information.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword123"
}
```

**Request Body Schema:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Success Response:**

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "id": "user-id-123",
  "email": "user@example.com",
  "name": "User Name" // Optional, can be null or email
}
```

**Error Response:**

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Invalid email or password" // or other error message
}
```

**Error Status Codes:**
- `401`: Invalid credentials
- `400`: Invalid input format
- `500`: Internal server error

---

## Response Format Standards

### Success Response Format

All successful responses should return a JSON object with the following structure:

```json
{
  "id": "string (required)",
  "email": "string (required)",
  "name": "string (optional)"
}
```

**Field Descriptions:**
- `id`: Unique identifier for the user (string, required)
- `email`: User's email address (string, required)
- `name`: User's display name (string, optional). If not provided, the frontend will use the email as the name.

### Error Response Format

All error responses should return a JSON object with the following structure:

```json
{
  "message": "Error description here"
}
```

**Field Descriptions:**
- `message`: Human-readable error message (string, required)

---

## Security Considerations

1. **Password Security:**
   - Passwords should be hashed using a secure hashing algorithm (e.g., bcrypt, Argon2)
   - Never return passwords in API responses
   - Implement password strength requirements on the backend

2. **Email Validation:**
   - Validate email format on the backend
   - Ensure email uniqueness for signup

3. **Rate Limiting:**
   - Implement rate limiting on authentication endpoints to prevent brute force attacks
   - Recommended: 5-10 requests per minute per IP address

4. **HTTPS:**
   - Always use HTTPS in production
   - Never send credentials over unencrypted connections

5. **CORS:**
   - Configure CORS to allow requests from the frontend domain
   - Do not use wildcard (`*`) for credentials

6. **Session Management:**
   - The frontend uses NextAuth.js for session management
   - The backend should validate sessions if implementing additional protected endpoints
   - Consider implementing JWT tokens or session tokens for API authentication

---

## Example Implementation

### Node.js/Express Example

```javascript
// Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Return user data (without password)
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name || user.email,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sign In Endpoint
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return user data (without password)
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name || user.email,
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

## Testing

### Sign Up Test

```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Sign In Test

```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

---

## Environment Variables

The frontend expects the following environment variable:

- `NEXT_PUBLIC_API_URL`: The base URL of your backend API (e.g., `http://localhost:3001` or `https://api.example.com`)

---

## Additional Notes

1. **Session Management:** The frontend handles session management using NextAuth.js. The backend only needs to provide authentication endpoints.

2. **Token-Based Auth (Optional):** If you want to implement token-based authentication for additional API endpoints, you can extend the signin response to include an access token:

```json
{
  "id": "user-id-123",
  "email": "user@example.com",
  "name": "User Name",
  "accessToken": "jwt-token-here" // Optional
}
```

3. **User Profile Updates:** If you need to update user profiles, consider implementing additional endpoints like:
   - `PUT /api/auth/profile` - Update user profile
   - `GET /api/auth/profile` - Get user profile
   - `DELETE /api/auth/account` - Delete user account

4. **Password Reset:** Consider implementing password reset functionality:
   - `POST /api/auth/forgot-password` - Request password reset
   - `POST /api/auth/reset-password` - Reset password with token

---

## Support

For questions or issues regarding the API integration, please contact the frontend development team.

