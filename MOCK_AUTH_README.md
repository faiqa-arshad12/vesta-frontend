# Mock Authentication Setup

This project uses **mock authentication** for development. All authentication is handled locally without requiring a backend server.

## How It Works

### Mock User Database

The mock user system uses an in-memory store located in `src/lib/mock-users.ts`. This means:
- ✅ Users are stored in memory during the server session
- ⚠️ Users are **lost when the server restarts**
- ✅ Perfect for development and testing
- ✅ Easy to replace with real backend API later

### Default Test User

A default test user is pre-configured:

- **Email:** `test@example.com`
- **Password:** `password123`

You can use these credentials to sign in immediately.

## Usage

### Sign Up

1. Navigate to `/signup`
2. Enter your email and password
3. Click "Sign Up"
4. You'll be automatically signed in and redirected to the dashboard

**Note:** New users are stored in memory and will be lost when the server restarts.

### Sign In

1. Navigate to `/signin`
2. Use the test credentials or any account you've created
3. Click "Sign In"
4. You'll be redirected to the dashboard

## Files Involved

### Mock Implementation Files

- `src/lib/mock-users.ts` - In-memory user database
- `src/app/api/auth/signup/route.ts` - Mock signup API endpoint
- `src/lib/auth.ts` - NextAuth config using mock credentials

### How to Replace with Real Backend

When your backend is ready, you'll need to update:

1. **`src/lib/auth.ts`** - Replace the `authorize` function:
   ```typescript
   // Replace this:
   const user = verifyCredentials(...);

   // With this:
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {...});
   ```

2. **`src/components/auth/form/SignupForm.tsx`** - Update the signup fetch URL:
   ```typescript
   // Replace this:
   const signupResponse = await fetch("/api/auth/signup", {...});

   // With this:
   const signupResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {...});
   ```

3. **Delete or ignore:**
   - `src/lib/mock-users.ts` (no longer needed)
   - `src/app/api/auth/signup/route.ts` (backend will handle this)

## Testing

### Test Sign Up Flow

```bash
# Start the dev server
npm run dev

# Navigate to http://localhost:3000/signup
# Create a new account
# You should be automatically signed in
```

### Test Sign In Flow

```bash
# Use the default test user:
# Email: test@example.com
# Password: password123

# Or use any account you created
```

### Test Protected Routes

```bash
# Try accessing /dashboard without signing in
# You should be redirected to /signin

# After signing in, you should be able to access /dashboard
```

## Limitations

⚠️ **Important Limitations of Mock Auth:**

1. **No Persistence:** Users are lost when the server restarts
2. **No Password Hashing:** Passwords are stored in plain text (for development only!)
3. **Single Server Instance:** Won't work with multiple server instances
4. **No Real Security:** This is for development only, not production!

## Security Notes

🔒 **Never use mock authentication in production!**

The mock implementation:
- Stores passwords in plain text
- Has no real security measures
- Is only suitable for local development

Always replace with a proper backend API before deploying to production.

## Troubleshooting

### "Invalid email or password" error

- Make sure you're using the correct credentials
- If you just created an account, make sure the server didn't restart (which would clear the mock database)
- Check the browser console for any errors

### Users disappearing

- This is expected! The mock database is in-memory and resets on server restart
- To persist users, you'll need to implement a real backend

### Can't sign up

- Check that the `/api/auth/signup` route is working
- Check the browser console for errors
- Verify the email format is valid
- Ensure password is at least 6 characters

## Next Steps

When you're ready to connect to a real backend:

1. Set up your backend API following `BACKEND_API_DOCUMENTATION.md`
2. Update the environment variables in `.env.local`
3. Replace the mock implementation as described above
4. Test the integration thoroughly

