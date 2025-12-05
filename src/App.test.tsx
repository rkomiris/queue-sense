import { render, screen } from '@testing-library/react';
import App from './App';

describe('QueueSense shell', () => {
  it('renders the login experience', () => {
    render(<App />);
    expect(screen.getByText(/QueueSense/)).toBeInTheDocument();
  });
});
