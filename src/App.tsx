import { Provider } from 'react-redux';
import './App.css';
import { GroceryTrackingProvider } from './context/GroceryTrackingContext';
import { LayoutPage } from './pages/LayoutPage';
import { store } from './store/store';
import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  
  return (
      <Provider store={store}>
        <GroceryTrackingProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to={"/login"} replace />}/>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/home' element={<LayoutPage />} />
              <Route path='/*' element={<Navigate to={"/home"} replace />} />
            </Routes>
          </BrowserRouter>
        </GroceryTrackingProvider>
      </Provider>
   
  )
}

export default App
