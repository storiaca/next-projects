export async function GET() {
  const secretKey = process.env.SECRET_API_KEY;

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
    headers: {
      "you-api-key": secretKey!,
    },
  });
}
