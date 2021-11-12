import { Action, Task } from './types';

export function setTasks(tasks: Task[]): Action {
  return {
    type: 'setTasks',
    payload: {
      tasks,
    },
  };
}

export default {};
