import { useSelector } from 'react-redux';
import List from './List';

export default function ListContainer() {
  const { tasks } = useSelector((state: any) => ({
    tasks: state.tasks,
  }));

  return (
    <List tasks={tasks} />
  );
}
