import PropTypes from 'prop-types';
import KanbanTask from './KanbanTask.jsx';

const KanbanColumn = ({ column, tasks, position, totalColumns, onMoveBackward, onMoveForward, onDelete }) => {
  const isFirstColumn = position === 0;
  const isLastColumn = position === totalColumns - 1;

  return (
    <section className="kanban-column">
      <header className="kanban-column__header">
        <h2>{column.title}</h2>
        <p>{column.description}</p>
      </header>
      <div className="kanban-column__body">
        {tasks.length === 0 ? (
          <p className="kanban-column__empty">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <KanbanTask
              key={task.id}
              task={task}
              onMoveBackward={onMoveBackward}
              onMoveForward={onMoveForward}
              onDelete={onDelete}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
            />
          ))
        )}
      </div>
    </section>
  );
};

KanbanColumn.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired
    })
  ),
  position: PropTypes.number.isRequired,
  totalColumns: PropTypes.number.isRequired,
  onMoveBackward: PropTypes.func.isRequired,
  onMoveForward: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

KanbanColumn.defaultProps = {
  tasks: []
};

export default KanbanColumn;
