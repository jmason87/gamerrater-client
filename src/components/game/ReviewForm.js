import React, {useState} from "react"
import { createReview } from "./GameManager"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const ReviewForm = () => {
    const date = new Date()
    const history = useHistory()
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)
    const [currentReview, setCurrentReview] = useState({
        content: "",
        date: date.toISOString().split('T')[0],
        game: parsedId
    })


    const submitReview = (evt) => {
        evt.preventDefault()
        const newReview = {
            content: currentReview.content,
            date: currentReview.date,
            game: currentReview.game
        }
        createReview(newReview).then(history.push(`/games/${parsedId}`))
    }


    const changeReviewState = (domEvent) => {
        let copy = currentReview
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentReview(copy)
    }

    return(
        <>
            <h1>Review</h1>
            <div>
                <textarea name="content" onChange={changeReviewState}></textarea>
            </div>
            {/* <div>
                <textarea name="content" onChange={
                    (evt) => {
                        const copy = {...currentReview}
                        copy.content = evt.target.value
                        setCurrentReview(copy)
                    }
                }></textarea>
            </div> */}

            <div>
                <button onClick={submitReview}>Save</button>
            </div>
        </>
    )
}