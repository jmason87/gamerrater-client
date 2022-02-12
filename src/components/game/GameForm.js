import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getCategories } from "../category/CategoryManager"
import { createGame } from "./GameManager"

export const GameForm = () => {
    const history = useHistory()
    const [categories, setCats] = useState([])
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        year: "",
        number_of_players: 0,
        time_to_play: 0,
        age_recommendation: 0,
        category: []
    })

    useEffect(() => {
        getCategories().then(setCats)
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        let copy = currentGame
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }


    return (
        <>
            <form>
                <fieldset>
                    <h2>New Game Form</h2>
                    <div>
                        <label>Title</label>
                        <input type='text' name="title" placeholder="Title" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type='text' name="description" placeholder="Description" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Designer</label>
                        <input type='text' name="designer" placeholder="Designer" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Year</label>
                        <input type='text' name="year" placeholder="Year" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Number of Players</label>
                        <input type='text' name="number_of_players" placeholder="" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Time to play</label>
                        <input type='text' name="time_to_play" placeholder="" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Age Recommendation</label>
                        <input type='text' name="age_recommendation" placeholder="" onChange={changeGameState}></input>
                    </div>
                    <div>
                        <label>Category</label>
                        {/* <select name="category" onChange={changeGameState}>
                            <option>Choose a Category</option> */}
                            {
                                categories.map(category => {
                                    return <div>
                                           <p> <input 
                                                type="checkbox" 
                                                name="cat"
                                                value={category.id}
                                                onChange={changeGameState}
                                                />{category.title}</p></div>
                                })
                            }
                        {/* </select> */}
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        const game = {
                            title: currentGame.title,
                            description: currentGame.description,
                            designer: currentGame.designer,
                            year_released: currentGame.year,
                            number_of_players: currentGame.number_of_players,
                            est_time_to_play: currentGame.time_to_play,
                            age_recomendation: currentGame.age_recommendation,
                            category: parseInt(currentGame.category)
                        }
                        createGame(game)
                            .then(() => history.push("/games"))
                    }}
                >Save Entry</button>
            </form>



        </>
    )
}