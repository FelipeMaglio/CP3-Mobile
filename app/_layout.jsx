import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    // UserProvider DEVE envolver tudo
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}