import { getSession } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()
  
  if(!session?.user) {
    redirect("/sign-in")
  }
  return(
    <>
      <h1>Dashboard Page</h1>
    </>
  )
}