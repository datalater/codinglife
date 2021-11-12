interface Task {
  id: string;
  title: string;
}

export interface Props {
  tasks: Task[];
}

export default function List({ tasks }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
