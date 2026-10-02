import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

describe('<ThemedText />', () => {
  test('renders its children', async () => {
    await render(<ThemedText>Hello calendar</ThemedText>);

    expect(screen.getByText('Hello calendar')).toBeTruthy();
  });

  test('applies the title style when type="title"', async () => {
    await render(<ThemedText type="title">Title</ThemedText>);

    expect(screen.getByText('Title')).toHaveStyle({ fontSize: 48 });
  });
});
