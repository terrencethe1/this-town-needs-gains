import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { ExercisePage } from './pages/ExercisePage.tsx';
import { MealsPage } from './pages/MealsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, 
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/exercise',
        element: <ExercisePage />
      },
      {
        path: '/meals',
        element: <MealsPage />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
