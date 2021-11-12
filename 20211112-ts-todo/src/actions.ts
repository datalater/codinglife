export function setTasks(tasks: any) {
  return {
    type: 'setTasks',
    payload: {
      tasks,
    },
  };
}

export default {};
