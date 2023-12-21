import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: string; // Change this to the type of 'username' or 'userId'.
  }
}
