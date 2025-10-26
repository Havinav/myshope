import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Components/AppLayout';
import Search from './Pages/Search';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Dashboard from './Components/Dashboard';
import ProductDetails from './Pages/ProductDetails';
import Account from './Components/Account';
import Orders from './Pages/OrderTracker';
import CheckOut from './Pages/CheckOut';
import NotFound from './Components/NotFound'
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Register';
import Address from './Pages/Address';

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
          path: '/register',
          element: <Register />,
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
         path:'/address', element:<Address/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
         path:'/checkout', element:<CheckOut/>
        }
      ],
    },
  ]);

  return <div>
    <RouterProvider router={routes} />
    <ToastContainer />
  </div>;
};

export default App;