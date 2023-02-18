import { MdCatchingPokemon } from 'react-icons/md'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PokemonPage from './components/PokemonPage'
import './App.css'
import { useState } from 'react'

export default function App(){
  const [currentPage, setCurrentPage] = useState(0)

  const WebsiteNav = () => (
    <nav>
      <MdCatchingPokemon />
      Pokédex
    </nav>
  )

  return(
    <main>
      <WebsiteNav />
      
      <Routes>
        <Route path='/' element={ <Home currentPage={currentPage} setCurrentPage={setCurrentPage} /> } />
        <Route path='/pokemon/*' element={ <PokemonPage/> } />
      </Routes>
    </main>
  )
}
