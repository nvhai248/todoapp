import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string | null;
      id?: string | null;
    };
  }

  interface User {
    provider?: string | null;
  }
}
