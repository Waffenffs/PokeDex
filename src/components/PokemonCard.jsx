import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, createContext } from 'react'

export default function PokemonCard({ name, pokeIndex, url, currentPage }) {

    const thisName = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
    const data = {
        name: thisName,
        pokeIndex: pokeIndex,
        url: url,
        currentPage: currentPage,
    }

    return(
            <Link to={`/pokemon/${pokeIndex}`} className="pokemon-link" state={{data}} >
                <article className='pokemonCard'>
                    <div className="indexContainer">
                        <h1 className="index" style={{ color: '#5f5f5f'}}>
                            <span className='hashtag'>#</span>
                            {pokeIndex}
                        </h1>
                    </div>
                    <div className="imageContainer">
                        <img 
                            className='pokemon-image'
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`}
                            alt='pokemon-image'
                        />
                    </div>
                    <div className="nameContainer">
                        <h1 className="pokemonCardName" style={{ color: '#5f5f5f' }}>{thisName}</h1>
                    </div>
                </article>
            </Link>

    )
}