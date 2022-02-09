import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getGames, getSingleGame } from "./GameManager"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const Games = () => {
    const [games, setGames] = useState([])
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)

    useEffect(
        () => {
            getGames()
                .then((data) => {
                    setGames(data)
                })
        },
        []
    )

    return (
        <>
            <h1>Games</h1>
            <Link to="/gameform">Register New Game</Link>
            <div>
                {
                    games.map(
                        (game) => {
                            return <section key={`game--${game.id}`}>
                                <div>
                                    <Link to={`/games/${game.id}`} >{game.title}</Link>
                                </div>
                            </section>
                        }
                    )
                }
            </div>
        </>
    )
}