import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { Header } from './Header';

jest.mock('aws-amplify');

test('should match snapshot', () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

test('sign out', async () => {
  const { findByText } = render(<Header />);
  const signOutButton = await findByText('Sign out');
  await fireEvent.click(signOutButton);
  
  expect(Auth.signOut).toHaveBeenCalled();
});