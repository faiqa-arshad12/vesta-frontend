import {auth} from "@/lib/auth";

/**
 * Get the current session on the server side
 * Use this in Server Components, Server Actions, and API routes
 */
export async function getServerSession() {
  return await auth();
}
