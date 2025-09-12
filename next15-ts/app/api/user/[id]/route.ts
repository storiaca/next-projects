import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const secretKey = process.env.SECRET_API_KEY;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    {
      headers: {
        "you-api-key": secretKey!,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({
      error: "Error on server during users fetch",
      status: 500,
    });
  }

  const user = await response.json();
  console.log(user);

  return NextResponse.json(user);
}
