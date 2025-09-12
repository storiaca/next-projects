import { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchUser(id: string) {
  const url = process.env.ENV_URL;
  const response = await fetch(`${url}/api/user/${id}`);
  const user = await response.json();

  return user;
}

// export const metadata: Metadata = {
//   title: "Single user page",
//   description: "Single user page description",
// };
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await fetchUser(params.id);

  if (!user || !Object.keys(user).length) {
    return {
      title: "User Not Found",
      description: "No user found with the provided ID.",
    };
  }

  return {
    title: user.name ? `User: ${user.name}` : "Single user page",
    description: user.username
      ? `Profile of ${user.username}`
      : "Single user page description",
    openGraph: {
      title: user.name + " " + "details",
      description: `${user.name} description`,
      images: [{ url: "", width: 800, height: 400 }],
      locale: "sr_RS",
      type: "article",
      url: `${process.env.ENV_URL}user/${params.id}`,
    },
  };
}

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
