"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/user");
      const usersResponse = await response.json();
      setUsers(usersResponse);
    };

    getUsers();
  }, []);

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
