import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getReviews, getSingleGame } from "./GameManager"

export const GameDetails = () => {
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)
    const history = useHistory()

    useEffect(
        () => {
            getSingleGame(parsedId)
                .then((data) => {
                    setGame(data)
                })
        },
        []
    )

    useEffect(() => {
        getReviews().then(setReviews)
    }, [])

    return (
        <>
            <div>Title:    {game.title}</div>
            <div>Description:   {game.description}</div>
            <div>Designer:    {game.designer}</div>
            <div>Year Released:    {game.year_released}</div>
            <div>Number of Players:    {game.number_of_players}</div>
            <div>Estimated time to play:   {game.est_time_to_play}</div>
            <div>Age Recommendation:    {game.age_recomendation}</div>
            <div>Category: {game.category?.title}</div>
            <button onClick={() => { history.push(`/games/${game.id}/review`) }}>Review Game</button>
            <div>
                <h2>Reviews</h2>
                {
                    reviews.map(
                        (review) => {
                            if (review.game?.id === parsedId) {
                                return <p>{review.content}</p>
                            }
                        }
                    )
                }
            </div>

        </>
    )
}