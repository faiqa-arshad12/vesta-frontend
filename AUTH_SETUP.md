# Authentication Setup Guide

This guide will help you set up NextAuth.js authentication in your Next.js application.

## Prerequisites

- Node.js installed
- Backend API running (see `BACKEND_API_DOCUMENTATION.md` for API requirements)

## Installation

NextAuth.js has already been installed. If you need to reinstall:

```bash
npm install next-auth@beta
```

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# NextAuth Configuration
# Generate a secret key using: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret key using one of these methods:

**Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Project Structure

The authentication implementation consists of the following files:

```
src/
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   └── session.ts           # Server-side session helper
├── app/
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts # NextAuth API route handler
├── components/
│   ├── auth/
│   │   └── form/
│   │       ├── SigninForm.tsx
│   │       └── SignupForm.tsx
│   └── providers/
│       └── SessionProvider.tsx
├── middleware.ts            # Route protection middleware
└── types/
    └── next-auth.d.ts      # TypeScript type definitions
```

## How It Works

### 1. Authentication Flow

- **Sign Up**: User fills out the signup form → Frontend calls backend `/api/auth/signup` → On success, automatically signs in using NextAuth
- **Sign In**: User fills out the signin form → NextAuth calls backend `/api/auth/signin` → Creates session if credentials are valid
- **Protected Routes**: Middleware checks authentication status → Redirects to `/signin` if not authenticated

### 2. Protected Routes

All routes under `/dashboard` are protected. The middleware automatically:
- Redirects unauthenticated users to `/signin`
- Redirects authenticated users away from `/signin` and `/signup` to `/dashboard`

### 3. Session Management

- Sessions are managed by NextAuth.js
- Session data includes: `id`, `email`, and `name`
- Sessions are stored server-side

## Usage Examples

### Client Components

**Get session in client components:**
```tsx
"use client";

import {useSession} from "next-auth/react";

export default function MyComponent() {
  const {data: session, status} = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not logged in</div>;

  return <div>Welcome, {session?.user?.email}!</div>;
}
```

**Sign out:**
```tsx
"use client";

import {signOut} from "next-auth/react";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

### Server Components

**Get session in server components:**
```tsx
import {getServerSession} from "@/lib/session";

export default async function MyServerComponent() {
  const session = await getServerSession();

  if (!session) {
    return <div>Not logged in</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}
```

### API Routes

**Protect API routes:**
```tsx
import {auth} from "@/lib/auth";
import {NextResponse} from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  // Your protected API logic here
  return NextResponse.json({data: "Protected data"});
}
```

## Customization

### Changing Redirect URLs

Edit `src/lib/auth.ts`:

```typescript
pages: {
  signIn: "/signin",    // Change sign-in page
  signOut: "/signin",   // Change sign-out redirect
},
```

### Adding More User Data to Session

1. Update the backend API to return additional user fields
2. Update `src/lib/auth.ts` in the `authorize` function to include the new fields
3. Update `src/types/next-auth.d.ts` to include the new fields in the type definitions

### Adding Additional Providers

To add OAuth providers (Google, GitHub, etc.), update `src/lib/auth.ts`:

```typescript
import Google from "next-auth/providers/google";

providers: [
  Credentials({...}),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
],
```

## Testing

1. Start your backend API server
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000/signup` to create an account
4. Navigate to `http://localhost:3000/signin` to sign in
5. Try accessing `/dashboard` - you should be redirected to `/signin` if not authenticated

## Troubleshooting

### "NEXTAUTH_SECRET is not set"

Make sure you have created `.env.local` with the `NEXTAUTH_SECRET` variable.

### "Invalid credentials" error

- Verify your backend API is running
- Check that `NEXT_PUBLIC_API_URL` is correct
- Verify the backend API endpoints match the documentation in `BACKEND_API_DOCUMENTATION.md`

### Session not persisting

- Check that cookies are enabled in your browser
- Verify `NEXTAUTH_URL` matches your application URL
- Check browser console for any errors

### Middleware not working

- Ensure `middleware.ts` is in the root of your `src` directory
- Check that the matcher pattern in `middleware.ts` is correct
- Verify Next.js version is 13+ (App Router)

## Security Best Practices

1. **Never commit `.env.local`** - Add it to `.gitignore`
2. **Use HTTPS in production** - Always use HTTPS for authentication
3. **Set secure cookies** - NextAuth handles this automatically in production
4. **Validate on backend** - Always validate authentication on the backend for sensitive operations
5. **Rate limiting** - Implement rate limiting on your backend API

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/building-your-application/authentication)
- Backend API Documentation: See `BACKEND_API_DOCUMENTATION.md`

