import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import ListContainer from './ListContainer';

import tasks from '../../fixtures/tasks';

jest.mock('react-redux');

describe('ListContainer', () => {
  (useSelector as jest.Mock).mockImplementation((selector) => selector({
    tasks,
  }));

  it('renders tasks', () => {
    const { container } = render((
      <ListContainer />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});
