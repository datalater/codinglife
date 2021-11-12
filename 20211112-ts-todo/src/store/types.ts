export interface Task {
  id: string;
  title: string;
}

export type ActionType = 'setTasks'

export type Action = {
  type: ActionType,
  payload: {
    tasks: Task[]
  }
}
