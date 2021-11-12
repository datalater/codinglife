import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import App from './App';

import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);

  (useSelector as jest.Mock)
    .mockImplementation((selector: any) => selector({
      tasks,
    }));

  it('renders title', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/Todo/);
  });

  it('renders tasks', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});
