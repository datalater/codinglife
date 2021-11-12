import { Action, Task } from './types';

const initialState = {
  tasks: [] as Task[],
};

export default function reducer(
  state = initialState,
  { type, payload }: Action = {} as Action,
): { tasks: Task[] } {
  if (type === 'setTasks') {
    const { tasks } = payload;

    return {
      ...state,
      tasks,
    };
  }

  return state;
}

export type Reducer = ReturnType<typeof reducer>;
