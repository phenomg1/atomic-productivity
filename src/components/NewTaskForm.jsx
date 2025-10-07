import { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  title: '',
  description: ''
};

const NewTaskForm = ({ onSubmit }) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      return;
    }
    onSubmit(values);
    setValues(initialState);
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <div className="new-task-form__field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          placeholder="Add a new task"
          onChange={handleChange}
          required
        />
      </div>
      <div className="new-task-form__field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          placeholder="Optional context for the task"
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div className="new-task-form__actions">
        <button type="submit">Add to backlog</button>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewTaskForm;
