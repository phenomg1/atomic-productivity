import KanbanColumn from './components/KanbanColumn.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import { useKanbanBoard } from './hooks/useKanbanBoard.js';

const App = () => {
  const {
    columns,
    tasksByColumn,
    addTask,
    moveTaskBackward,
    moveTaskForward,
    deleteTask
  } = useKanbanBoard();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>Atomic Productivity</h1>
        <p>Ship work with a focused Kanban workflow.</p>
      </header>

      <section className="app-shell__new-task">
        <h2>Create a task</h2>
        <NewTaskForm onSubmit={addTask} />
      </section>

      <main className="kanban-board" aria-label="Kanban board">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id] ?? []}
            position={index}
            totalColumns={columns.length}
            onMoveBackward={moveTaskBackward}
            onMoveForward={moveTaskForward}
            onDelete={deleteTask}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
