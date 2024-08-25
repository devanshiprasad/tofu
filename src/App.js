import React from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import RecipeFilter from './Pages/RecipeFilter';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Welcome from './Pages/Welcome';


function App() {
  return (
   <>
   <Routes>

    <Route path='/' Index element={<Welcome/>}/>
    <Route path='RecipeFilter' element={<RecipeFilter/>}/>
    <Route path='Auth' element={<Auth/>}/>
   </Routes>

  
   </>
  );
}

export default App;


