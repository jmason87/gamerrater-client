import React from "react"
import { Route } from "react-router-dom"
import { Games } from "./game/GameList"
import { GameDetails } from "./game/GameDetails"
import { GameForm } from "./game/GameForm"
import { ReviewForm } from "./game/ReviewForm"
import { GameUpdateForm } from "./game/GameUpdateForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/games">
                <Games />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/gameform">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/edit">
                <GameUpdateForm />
            </Route>

        </>
    )
}










{/* <main style={{
    margin: "5rem 2rem",
    backgroundColor: "lightgoldenrodyellow"
}}>
    Application views
</main> */}
