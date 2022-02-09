import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getSingleGame } from "./GameManager"

export const GameDetails = () => {
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)

    useEffect(
        () => {
            getSingleGame(parsedId)
                .then((data) => {
                    setGame(data)
                })
        },
        [ parsedId ]
    )

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





        </>
    )
}