import { useRoutes, Navigate } from 'react-router-dom';

// Uitls

import AdminGuard from '../guards/AdminGuard';
import GuestGuard from '../guards/GuestGuard';
import UserGuard from '../guards/UserGuard';

// Components
import Login from '../views/Login';
import Register from '../views/Register';
import Logout from '../components/authentication/Logout';

// Views

import DashboardLayout from '../layouts/dashboard';
import PlantRecommendation from '../views/PlantRecommendation';
import HomePage from '../views/HomePage';
import CreatePlant from '../views/CreatePlant';
import PlantList from '../views/PlantList';
import UserList from "../views/UserList";
import CreateComment from '../views/CreateComment';

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login/>
            </GuestGuard>
          )
        },
          {
            path: 'register',
            element: (
            <GuestGuard>
              <Register/>
            </GuestGuard>
            )
          },
          {
            path: 'logout',
            element: <Logout/>
          },
        ]
      },
  
      // Admin Routes
      {
        path: 'admin',
        element: (
          <AdminGuard>
            <DashboardLayout />
          </AdminGuard>
        ),
        children: [
          { path: '/admin', element: <PlantList />  },
          { path: 'plants', element: <PlantList /> },
          { path: 'plants/create', element: <CreatePlant/>},
          { path: 'plants/edit/:plantId', element: <CreatePlant/>},
          { path: 'users', element: <UserList /> },
          //{ path: 'create', element: <CreateRide /> },
          //{ path: 'profile', element: <UserDetails /> },
          //{ path: 'rides/:rideId', element: <RideDetails /> },
          //{ path: 'rides/edit/:rideId', element: <AddRoute mainText='Modifica tu ruta' secondaryText='Modifica los siguientes datos para actualizar tu ruta' /> },
          //{ path: 'rides/addRoute', element: <AddRoute mainText='Agrega una nueva ruta' secondaryText='Ingresa los siguientes datos para crear tu nueva ruta' /> },
        ] 
      },
      {
        path: 'dashboard',
        element: (
          <UserGuard>
            <DashboardLayout />
          </UserGuard>
        ),
        children: [
          { path: '/dashboard', element: <HomePage/>  },
          { path: 'plants/:plantId', element: <PlantRecommendation/>},
          { path: 'plants/:plantId/addComment', element: <CreateComment/>},
          { path: 'plants/:plantId/editComment/:commentId', element: <CreateComment/>},
          //{ path: 'create', element: <CreateRide /> },
          //{ path: 'profile', element: <UserDetails /> },
          //{ path: 'rides/:rideId', element: <RideDetails /> },
          //{ path: 'rides/edit/:rideId', element: <AddRoute mainText='Modifica tu ruta' secondaryText='Modifica los siguientes datos para actualizar tu ruta' /> },
          //{ path: 'rides/addRoute', element: <AddRoute mainText='Agrega una nueva ruta' secondaryText='Ingresa los siguientes datos para crear tu nueva ruta' /> },
        ] 
      },
     { path: '/', element: <Navigate to="/auth/login" replace /> }
    ])
  }
