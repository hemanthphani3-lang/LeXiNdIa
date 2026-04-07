import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AdminDataProvider } from './contexts/AdminDataContext';

export default function App() {
  return (
    <AdminDataProvider>
      <RouterProvider router={router} />
    </AdminDataProvider>
  );
}