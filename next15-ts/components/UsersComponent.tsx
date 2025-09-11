"use client";

import Link from "next/link";

export const UsersComponent = ({ users }: any) => {
  return (
    <div>
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
};
