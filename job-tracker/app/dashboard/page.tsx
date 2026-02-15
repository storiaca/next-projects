import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db"
import { Board } from "@/lib/models"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()
  
  if(!session?.user) {
    redirect("/sign-in")
  }

  await connectDB()

  await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt"
  })

  return(
    <>
      <h1>Dashboard Page</h1>
    </>
  )
}