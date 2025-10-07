import { useMemo, useRef } from 'react';
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
  const newTaskSectionRef = useRef(null);

  const navigationGroups = useMemo(
    () => [
      {
        id: 'main',
        items: [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'notes', label: 'Notes' },
          { id: 'board', label: 'Board', isActive: true }
        ]
      },
      {
        id: 'workspaces',
        title: 'Workspaces',
        items: [
          { id: 'orange-moldova', label: 'Orange Moldova' },
          { id: 'freelance', label: 'Freelance' },
          { id: 'job-search', label: 'Job search' },
          { id: 'content-creation', label: 'Content creation' }
        ]
      },
      {
        id: 'personal',
        title: 'Personal',
        items: [{ id: 'habits', label: 'Habits' }]
      }
    ],
    []
  );

  const handleAddTaskClick = () => {
    const section = newTaskSectionRef.current;
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstInput = section.querySelector('input, textarea, button');
    if (firstInput && typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        firstInput.focus();
      });
    }
  };

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar" aria-label="Main navigation">
        <div className="app-shell__sidebar-top">
          <div className="app-shell__brand">
            <div className="app-shell__mark" aria-hidden="true">
              <span />
            </div>
            <span className="app-shell__brand-name">AtomicPlanner</span>
          </div>

          <nav className="sidebar-nav">
            {navigationGroups.map(({ id, title, items }) => (
              <div key={id} className="sidebar-nav__group">
                {title && <p className="sidebar-nav__group-title">{title}</p>}
                <ul>
                  {items.map(({ id: itemId, label, isActive }) => (
                    <li key={itemId}>
                      <button
                        className={`sidebar-nav__item${isActive ? ' sidebar-nav__item--active' : ''}`}
                        type="button"
                        {...(isActive ? { 'aria-current': 'page' } : {})}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="app-shell__profile" aria-label="Account">
          <div className="app-shell__avatar" aria-hidden="true">
            <span>GD</span>
          </div>
          <div className="app-shell__profile-details">
            <p className="app-shell__profile-name">Ghetu Dionisie</p>
            <p className="app-shell__profile-role">Product designer</p>
          </div>
          <button type="button" className="app-shell__profile-action" aria-label="Account menu">
            ⋯
          </button>
        </div>
      </aside>

      <div className="app-shell__main">
        <header className="board-header">
          <div className="board-header__text">
            <h1>Tasks board</h1>
            <p>Manage and track your tasks</p>
          </div>
          <button type="button" className="board-header__cta" onClick={handleAddTaskClick}>
            + Add task
          </button>
        </header>

        <div className="board-content">
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
                onAddTask={handleAddTaskClick}
              />
            ))}
          </main>

          <section ref={newTaskSectionRef} className="app-shell__new-task" id="new-task">
            <h2>Create a task</h2>
            <NewTaskForm onSubmit={addTask} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
