import { NextResponse } from "next/server";

export async function GET() {
  const secretKey = process.env.SECRET_API_KEY;

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
    headers: {
      "you-api-key": secretKey!,
    },
  });

  if (!response.ok) {
    return NextResponse.json({
      error: "Error on server during users fetch",
      status: 500,
    });
  }

  const users = await response.json();

  return NextResponse.json(users);
}
