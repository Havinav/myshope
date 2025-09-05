import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Components/AppLayout';
import Search from './Pages/Search';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/Notfound';
import ProductDetails from './Pages/ProductDetails';
import Account from './Components/Account';
import Orders from './Pages/OrderTracker';

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/s/q',
          element: <Search />,
        },
        {
          path: '/s/:category',
          element: <Search />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/product-details/:id',
          element:<ProductDetails />
        },
        {
          path:"/account",
          element:<Account/>
        },
        {
          path:"/orders",
          element:<Orders/>
        }
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;