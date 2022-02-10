import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCategories } from "../category/CategoryManager"
import { createGame, getSingleGame, updateGame } from "./GameManager"

export const GameUpdateForm = () => {
    const history = useHistory()
    const [categories, setCats] = useState([])
    const [game, setGame] = useState({})
    
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newDesigner, setNewDesigner] = useState("")
    const [newYear, setNewYear] = useState("")
    const [newNumberOfPlayers, setNewNumberOfPlayers] = useState(0)
    const [newTimeToPlay, setNewTimeToPlay] = useState(0)
    const [newAgeRec, setNewAgeRec] = useState(0)
    const [newCategory, setNewCategory] =useState(0)

    const { gameId } = useParams()
    const parsedId = parseInt(gameId)

    useEffect(() => {
        getCategories().then(setCats)
    }, [])

    useEffect(() => {
        getSingleGame(parsedId).then(setGame)
    }, [])

    useEffect(() => {
        setNewTitle(game.title)
        setNewDescription(game.description)
        setNewDesigner(game.designer)
        setNewYear(game.year_released)
        setNewNumberOfPlayers(game.number_of_players)
        setNewTimeToPlay(game.est_time_to_play)
        setNewAgeRec(game.age_recomendation)
        setNewCategory(game.category?.id)
    }, [game])

    const updatedEditedGame = () => {
        const updatedGame = {
            title: newTitle,
            description: newDescription,
            designer: newDesigner,
            year_released: newYear,
            number_of_players: newNumberOfPlayers,
            est_time_to_play: newTimeToPlay,
            age_recomendation: newAgeRec,
            category: parseInt(newCategory)
        }
        updateGame(updatedGame, parsedId)
            .then(history.push("/games"))
    }


    return (
        <>
            <form>
                <fieldset>
                    <h2>Edit Game Form</h2>
                    <div>
                        <label>Title</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewTitle(e.target.value)}
                            value={newTitle}
                            />
                    </div>
                    <div>
                        <label>Description</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewDescription(e.target.value)}
                            value={newDescription}
                            />
                    </div>
                    <div>
                        <label>Designer</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewDesigner(e.target.value)}
                            value={newDesigner}
                            />
                    </div>
                    <div>
                        <label>Year</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewYear(e.target.value)}
                            value={newYear}
                            />
                    </div>
                    <div>
                        <label>Number of Players</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewNumberOfPlayers(e.target.value)}
                            value={newNumberOfPlayers}
                            />
                    </div>
                    <div>
                        <label>Time To Play</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewTimeToPlay(e.target.value)}
                            value={newTimeToPlay}
                            />
                    </div>
                    <div>
                        <label>Age Recommendation</label>
                        <input 
                            type='text' 
                            name="title" 
                            placeholder="Title" 
                            onChange={e => setNewAgeRec(e.target.value)}
                            value={newAgeRec}
                            />
                    </div>
                    <div>
                        <label>Category</label>
                        <select name="category" >
                            <option>Select a Category</option>
                            {
                                categories.map(category => {
                                    if (game.category?.id === category.id) {
                                    return <option value={category.id} selected>{category.title}</option>
                                } else {
                                    return <option value={category.id}>{category.title}</option>
                                }
                                })
                            }
                        </select>
                    </div> 
                </fieldset>
                <button onClick={updatedEditedGame}>Update</button>
            </form>



        </>
    )
}