import { useCallback, useMemo, useState } from 'react';

const STORAGE_KEY = 'atomic-productivity::kanban';

const createId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

const defaultColumns = [
  { id: 'backlog', title: 'Backlog', description: 'Ideas and unsorted work' },
  { id: 'todo', title: 'To Do', description: 'Committed work ready to be started' },
  { id: 'in-progress', title: 'In Progress', description: 'Work that is currently underway' },
  { id: 'review', title: 'Review', description: 'Work awaiting validation or QA' },
  { id: 'done', title: 'Done', description: 'Completed and accepted work' }
];

const defaultTasks = [
  {
    id: createId(),
    title: 'Draft user stories',
    description: 'Outline the core user journeys for the MVP.',
    status: 'backlog'
  },
  {
    id: createId(),
    title: 'Set up CI pipeline',
    description: 'Configure automated tests and deployments.',
    status: 'in-progress'
  },
  {
    id: createId(),
    title: 'UX review',
    description: 'Review wireframes with the design team.',
    status: 'review'
  }
];

const loadState = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return defaultTasks;
  }

  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return defaultTasks;
    }
    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed)) {
      return defaultTasks;
    }
    return parsed;
  } catch (error) {
    console.warn('Failed to read stored kanban state', error);
    return defaultTasks;
  }
};

const persistState = (tasks) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Failed to persist kanban state', error);
  }
};

export const useKanbanBoard = () => {
  const [tasks, setTasks] = useState(() => loadState());

  const updateTasks = useCallback((updater) => {
    setTasks((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      persistState(next);
      return next;
    });
  }, []);

  const addTask = useCallback((task) => {
    updateTasks((current) => [
      {
        id: createId(),
        status: 'todo',
        ...task
      },
      ...current
    ]);
  }, [updateTasks]);

  const updateTaskStatus = useCallback((taskId, status) => {
    updateTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, status }
          : task
      )
    );
  }, [updateTasks]);

  const deleteTask = useCallback((taskId) => {
    updateTasks((current) => current.filter((task) => task.id !== taskId));
  }, [updateTasks]);

  const tasksByColumn = useMemo(() => {
    return defaultColumns.reduce((accumulator, column) => {
      return {
        ...accumulator,
        [column.id]: tasks.filter((task) => task.status === column.id)
      };
    }, {});
  }, [tasks]);

  const moveTaskForward = useCallback((taskId) => {
    updateTasks((current) => {
      const statuses = defaultColumns.map((column) => column.id);
      return current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }
        const index = statuses.indexOf(task.status);
        const nextStatus = statuses[Math.min(index + 1, statuses.length - 1)];
        return { ...task, status: nextStatus };
      });
    });
  }, [updateTasks]);

  const moveTaskBackward = useCallback((taskId) => {
    updateTasks((current) => {
      const statuses = defaultColumns.map((column) => column.id);
      return current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }
        const index = statuses.indexOf(task.status);
        const nextStatus = statuses[Math.max(index - 1, 0)];
        return { ...task, status: nextStatus };
      });
    });
  }, [updateTasks]);

  return {
    columns: defaultColumns,
    tasks,
    tasksByColumn,
    addTask,
    updateTaskStatus,
    moveTaskForward,
    moveTaskBackward,
    deleteTask
  };
};
