import { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchUser(id: string) {
  const url = process.env.ENV_URL;
  const response = await fetch(`${url}/api/user/${id}`);
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

  if (!Object.keys(user).length) {
    return notFound();
  }

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
