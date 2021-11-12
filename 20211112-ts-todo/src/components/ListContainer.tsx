import { useSelector } from 'react-redux';
import { RootState } from '../store';
import List from './List';

export default function ListContainer() {
  const { tasks } = useSelector((state: RootState) => ({
    tasks: state.tasks,
  }));

  return (
    <List tasks={tasks} />
  );
}
