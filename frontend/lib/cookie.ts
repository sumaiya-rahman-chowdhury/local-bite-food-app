"use server";

import { cookies } from "next/headers";

export const AuthToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  return token;
};

export const setCookie = async(token:string)=>{
  const cookieStore = await cookies()
  cookieStore.set('session', token)
}

export const clearSession = async()=>{
const cookieStore = await cookies()
  cookieStore.delete('session')
}