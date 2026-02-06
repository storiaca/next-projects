import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="border boder-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 gap-2 text-lg font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex ites-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 cursor-pointer hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
            <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-gray-700 cursor-pointer hover:text-black"
            >
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary cursor-pointer hover:bg-primary/90">
              Start for free
            </Button>
          </Link></>
          )}
          
        </div>
      </div>
    </nav>
  );
}
