import { useState, useEffect } from "react"
import PokemonCard from "../components/PokemonCard"
import '../App.css'

export default function Home() {
    
    // incrementing the offset by +10 everytime we go to next page
    // de-crementing the offset by -10 everytime we go back
        // then storing that new value to the pokemons state
            // then rendering the pokemons in the pokemon state

    /* 
        TO DOS:
    1. make it so that when guy clicks on the pokemon, a new page will appear (routing) (DONE)
        - that page will be of the pokemon's details (DONE)
    2. make it prettier with css animations (NOT DONE)
    */

    const [pokemonSearch, setPokemonSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [pokemons, setPokemons] = useState(useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${currentPage}`)
            .then(response => response.json())
            .then((data) => {
                setPokemons(data)
            })
            .catch((err) => {
                console.log('error', err)
                setPokemons('error')
            })
    }, [currentPage]))

    let pokemonCards;

    // in the case pokemons state has not initialized yet
    try {
        pokemonCards = pokemons.results.map((pokemon) => {
            return <PokemonCard 
                    name={pokemon.name}
                    pokeIndex={pokemon.url.split('/')[pokemon.url.split('/').length - 2]}
                    url={pokemon.url}
                    />
        })
    } catch (err) {
        console.log(err)
    }

    // handle submission of form/input
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div className="homeContainer">
            <div className="inputContainer">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={pokemonSearch}
                        onChange={(e) => setPokemonSearch(e.target.value)}
                        className="input-pokemon-search"
                        placeholder="Pokemon name..."
                    />
                </form>
            </div>
            
            <div className="pokemonCardContainer">
                {pokemonCards && pokemonCards}
            </div>

            <div className="buttonContainer">
                <div className="button">
                    {currentPage !== 0 && <button onClick={() => {
                        setCurrentPage(prevState => prevState - 20)
                        window.scrollTo(0, 0)
                        }}>Previous</button>}
                </div>
                <div className="button">
                    <button onClick={() => {
                        setCurrentPage(prevState => prevState + 20)
                        window.scrollTo(0, 0)
                        }}>Next</button>
                </div>
            </div>
        </div>
    )
}