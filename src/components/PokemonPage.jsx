import { useLocation } from "react-router-dom"
import '../App.css'
import { useState, useEffect } from "react"

export default function PokemonPage(data){
    /* TO DOS : GET EVOLUTION CHAIN AND DISPLAY IT */

    const [isDisplayed, setIsDisplayed] = useState(false)
    const location = useLocation(data)
    const thisData = location.state
    const [pokemonDescription, setPokemonDescription] = useState('')
    const [pokemonData, setPokemonData] = useState(useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${thisData.pokeIndex}`)
            .then((result) => result.json())
            .then((data) => {
                setPokemonDescription(data.flavor_text_entries[0].flavor_text)
                
                /* 
                    TO BE CONTINUED

                fetch(data.evolution_chain.url)
                    .then((res) => res.json())
                    .then((evolData) => console.log(evolData)) 
                */
            })

        fetch(thisData.url)
            .then((result) => result.json())
            .then((data) => {
                const pokemonTypes = data.types.map((res) => res.type)


                setPokemonData({
                    types: pokemonTypes,
                })

                setTimeout(() => {
                    setIsDisplayed(true)
                }, 1000)
            })
    }, []) || 'none')

    let tags;

    try {
        tags = pokemonData.types.map((tag) => {
            return <div className="pokemonTag">{tag.name}</div>
        })
    } catch (err) {
        console.log('err', err)
    }

    return(
        <>
            {!isDisplayed && 
                <div className="spinnerContainer">
                    <div className="spinner"></div>
                </div>
            }
            {isDisplayed && 
                <div className="pokemonContent">
                    <article className='pokemonCard-page'>
                        <div className="imageContainer">
                            <img 
                                className='pokemon-image-page'
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${thisData.pokeIndex}.png`}
                                alt='pokemon-image'
                            />
                        </div>
                        <div className="nameContainer">
                            <h1 className="pokemonPagez-name" style={{ color: '#5f5f5f' }}>{thisData.name}</h1>
                        </div>
                    </article>
        
                    <section>
                        <div className="pokeIndexContainer">
                            <h1 className="pokePage-index">#{thisData.pokeIndex}</h1>
                        </div>
        
                        <div className="pokemonDetails">
                            <div className="pokemonNameTags">
                                <div className="pokemonNameContainer">
                                    <h2 className="pokemonPage-name">{thisData.name}</h2>
                                </div>
                                <div className="pokemonTagContainer">
                                    {tags}
                                </div>
                            </div>
        
                            <div className="paraContainer">
                                {pokemonDescription}
                            </div>
                        </div>
        
                    </section>
                </div>
            }
        </>
    )
}