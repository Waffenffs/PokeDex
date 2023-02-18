import { useState, useEffect } from "react"
import PokemonCard from "../components/PokemonCard"
import '../App.css'

export default function Home({ currentPage, setCurrentPage}) {
    /* TO DO: ADD NEW POKEMON WHEN INPUT IS SUBMITTED */

    const [pokemonSearch, setPokemonSearch] = useState('')
    const [submission, setSubmission] = useState(false)
    const [pokemons, setPokemons] = useState(useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${currentPage}`)
            .then(response => response.json())
            .then((data) => {
                setPokemons(data.results)

                console.log(data.results)
            })
            .catch((err) => {
                console.log('error', err)
                setPokemons('error')
            })
    }, [currentPage]))

    let pokemonCards;

    // in the case pokemons state has not initialized yet
    try {
        pokemonCards = pokemons.map((pokemon) => {
            return <PokemonCard 
                    name={pokemon.name}
                    pokeIndex={pokemon.url.split('/')[pokemon.url.split('/').length - 2]}
                    url={pokemon.url}
                    />
        })
    } catch (err) {
        console.log(err)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`)
            .then((res) => res.json())
            .then((data) => {
                const pokemonObject = {
                    name: data.name,
                    url: data.species.url
                }

                const newPokemonState = pokemons.map((pokemon, index) => {
                    if(index === 0){
                        return pokemonObject
                    } return pokemon
                })

                setPokemons(newPokemonState)
            })

    }

    console.log(pokemons)
    
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
                    {currentPage !== 0 && 
                    
                    <button onClick={() => {
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
