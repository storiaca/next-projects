import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession()

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if(isDashboard && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}