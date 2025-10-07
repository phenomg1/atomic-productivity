import PropTypes from 'prop-types';

const KanbanTask = ({ task, onMoveBackward, onMoveForward, onDelete, isFirstColumn, isLastColumn }) => {
  return (
    <article className="task-card">
      <header className="task-card__header">
        <h3>{task.title}</h3>
      </header>
      {task.description && <p className="task-card__description">{task.description}</p>}
      <footer className="task-card__footer">
        <div className="task-card__actions">
          <button type="button" onClick={() => onMoveBackward(task.id)} disabled={isFirstColumn}>
            ←
          </button>
          <button type="button" onClick={() => onMoveForward(task.id)} disabled={isLastColumn}>
            →
          </button>
        </div>
        <button type="button" className="task-card__delete" onClick={() => onDelete(task.id)}>
          Remove
        </button>
      </footer>
    </article>
  );
};

KanbanTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired,
  onMoveBackward: PropTypes.func.isRequired,
  onMoveForward: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isFirstColumn: PropTypes.bool,
  isLastColumn: PropTypes.bool
};

KanbanTask.defaultProps = {
  isFirstColumn: false,
  isLastColumn: false
};

export default KanbanTask;
