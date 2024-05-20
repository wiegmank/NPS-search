import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './Components/Home'
import ParkSearch from './Components/ParkSearch';
import Favorites from './Components/Favorites';
import Itinerary from './Components/Itinerary';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
//import Root from "./routes/root";

export const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
) 