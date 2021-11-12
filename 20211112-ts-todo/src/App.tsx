import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import {
  setTasks,
} from './store/actions';

import ListContainer from './components/ListContainer';

import tasks from '../fixtures/tasks';

const AppContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  border: 1px solid;
`;

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, []);

  return (
    <AppContainer>
      <h1>Todo</h1>
      <ListContainer />
    </AppContainer>
  );
}
