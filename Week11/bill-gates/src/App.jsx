import './App.css'
import Header from './components/Header'
import Receipt from './components/Receipts'
import TotalWorth from './components/TotalWorth'
import { useState, createContext } from 'react'
import PageContent from './components/PageContent'

export const AppContext = createContext(null);

function App() {

  const [totalWorth, setTotalWorth] = useState(100000000000);

  return (
    <AppContext.Provider value={{totalWorth, setTotalWorth}}>
    <Header />
    <TotalWorth />
    <PageContent/>
    <Receipt />
    </AppContext.Provider>
  )
}

export default App