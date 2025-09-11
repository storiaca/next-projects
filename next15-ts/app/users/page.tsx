import { UsersComponent } from "@/components/UsersComponent";
import { Metadata } from "next";

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
      <UsersComponent users={users} />
    </div>
  );
}
