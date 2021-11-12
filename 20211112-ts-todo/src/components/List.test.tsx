import { render } from '@testing-library/react';

import List from './List';

import tasks from '../../fixtures/tasks';

describe('List', () => {
  it('renders tasks', () => {
    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
    expect(container).toHaveTextContent(/타입스크립트 학습/);
  });
});
