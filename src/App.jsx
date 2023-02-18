import { MdCatchingPokemon } from 'react-icons/md'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PokemonPage from './components/PokemonPage'
import './App.css'

export default function App(){

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
        <Route path='/' element={ <Home /> } />
        <Route path='/pokemon/*' element={ <PokemonPage /> } />
      </Routes>
    </main>
  )
}
