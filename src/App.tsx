import { Provider } from 'react-redux'
import './App.css'
import { GroceryTrackingProvider } from './context/GroceryTrackingContext'
import { LayoutPage } from './pages/LayoutPage'
import { store } from './store/store'
import { useState } from 'react'
import { LoginPage } from './pages/LoginPage'

function App() {
  const [login, setLogin] = useState(false);
  return (
      <Provider store={store}>
        <GroceryTrackingProvider>
          { !login ? <LoginPage handleLogin={() => setLogin((p => !p))} /> : <LayoutPage />} 
        </GroceryTrackingProvider>
      </Provider>
   
  )
}

export default App
