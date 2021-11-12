const initialState = {
  tasks: [],
};

export default function reducer(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: any,
): any {
  if (action.type === 'setTasks') {
    const { tasks } = action.payload;

    return {
      ...state,
      tasks,
    };
  }

  return state;
}
