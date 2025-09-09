import { Metadata } from "next";

//jsonplaceholder.typicode.com/

async function fetchUser(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user = await response.json();

  return user;
}

export const metadata: Metadata = {
  title: "Single user page",
  description: "Single user page description",
};

export default async function SingleUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await fetchUser(id);
  return (
    <div className="p-4">
      <h1>Single user</h1>
      <p>Name: {user?.name}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
}
