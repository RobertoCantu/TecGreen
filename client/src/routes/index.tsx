import { useRoutes, Navigate } from 'react-router-dom';

// Uitls

import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';

// Components

import Logout from '../components/authentication/Logout';

// Views

import DashboardLayout from '../layouts/dashboard';
import Test from '../views/Test';
import HomePage from '../views/HomePage';
import CreatePlant from '../views/CreatePlant';
import PlantList from '../views/PlantList';
import CreateComment from '../views/CreateComment';

export default function Router() {
  return useRoutes([
    /*{
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
            </GuestGuard>
          )
        },
          {
            path: 'register',
            element: (
            <GuestGuard>
            </GuestGuard>
            )
          },
          {
            path: 'logout',
            element: <Logout/>
          },
        ]
      },*/
  
      // Dashboard Routes
      {
        path: 'dashboard',
        /*element: (
          <DashboardLayout />
        ),*/
        children: [
          { path: '/dashboard', element: <HomePage /> },
          { path: 'plants', element: <PlantList /> },
          { path: 'plants/create', element: <CreatePlant/>},
          { path: 'plants/:plantId', element: <Test/>},
          { path: 'plants/:plantId/addComment', element: <CreateComment/>},
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
