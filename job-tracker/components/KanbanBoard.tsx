"use client"

type KanbanBoardProps = {
  board: "",
  userId: string
}
export default function KanbanBoard({board, userId}: KanbanBoardProps) {
  return (
    <>
    <h1>Kanban Board</h1>
    </>
  )
}