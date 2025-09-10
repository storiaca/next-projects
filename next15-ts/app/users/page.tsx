import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users page",
  description: "Users page description",
};

async function fetchUsers() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/`, {
    headers: {
      "you-api-key": "bla-bla-tajna",
    },
  });
  const user = await response.json();

  return user;
}

export default async function UsersPage() {
  const users = await fetchUsers();
  // console.log(users);

  return (
    <div>
      <h1>Users Page</h1>
      {users.map((user: any) => {
        return (
          <div key={user.id}>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone}</p>
            <Link href={`users/${user.id}`}>See Details</Link>
          </div>
        );
      })}
    </div>
  );
}
