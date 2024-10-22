import { db, User } from "astro:db";


export async function getUsers() {
  return db.select().from(User);
}