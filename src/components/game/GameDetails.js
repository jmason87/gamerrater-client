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
            <div>{game.title}</div>
            <div>{game.description}</div>
            <div>{game.designer}</div>
            <div>{game.year_released}</div>
            <div>{game.number_of_players}</div>
            <div>{game.est_time_to_play}</div>
            <div>{game.age_recomendation}</div>
            {/* <div>{game.category}</div> */}





        </>
    )
}