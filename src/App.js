import React from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import RecipeFilter from './Pages/RecipeFilter';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Welcome from './Pages/Welcome';
import FavoritesPage from './Pages/FavouritePage';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
   <>
   <Routes>

    <Route path='/' Index element={<Welcome/>}/>
    <Route path='RecipeFilter' element={<RecipeFilter/>}/>
    <Route path='Auth' element={<Auth/>}/>
    <Route 
          path="FavouritePage" 
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          } 
        />
   </Routes>

  
   </>
  );
}

export default App;


