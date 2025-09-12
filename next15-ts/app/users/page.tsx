import { UsersComponent } from "@/components/UsersComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users page",
  description: "Users page description",
};

export default async function UsersPage() {
  return (
    <div>
      <h1>Users Page</h1>
      <UsersComponent />
    </div>
  );
}
