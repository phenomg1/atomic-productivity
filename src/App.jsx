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
      <aside className="app-shell__sidebar" aria-label="Main navigation">
        <div className="app-shell__brand">
          <span className="app-shell__logo">Atomic</span>
          <span className="app-shell__logo app-shell__logo--muted">Productivity</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className="sidebar-nav__item sidebar-nav__item--active"
                type="button"
                aria-current="page"
              >
                Board
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="app-shell__main">
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
    </div>
  );
};

export default App;
