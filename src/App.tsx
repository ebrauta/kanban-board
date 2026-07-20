import Board from "@/components/Board"

const App = () => {
  return (
    <div className="min-h-screen bg-slate-0">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-bold text-slate-800">Kanban Board</h1>
        <p className="text-sm text-slate-500">
          Organize suas tarefas arrastando entre as colunas
        </p>
      </header>
      <Board />
    </div>
  )
}

export default App
