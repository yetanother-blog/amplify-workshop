import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

test('should match snapshot', () => {
  const { container } = render(<LoadingSpinner />);
  expect(container).toMatchSnapshot();
});