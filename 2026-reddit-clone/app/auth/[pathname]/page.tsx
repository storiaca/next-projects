import { AuthView } from "@neondatabase/auth/react";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;
  return (
    <div className="flex min-h-[100dhv] w-full flex-col items-center justify-center px-4 py-8">
      <div className="">
        <AuthView pathname={pathname} />
      </div>
      <h1>Auth page</h1>
    </div>
  );
}
