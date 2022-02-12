import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { createRating, getReviews, getSingleGame, getRatings, createImage, getImages, deleteImage } from "./GameManager"


export const GameDetails = () => {
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)
    const history = useHistory()
    const [rating, setRating] = useState({
        rating: 0,
        game: parsedId
    })
    const [ratings, setRatings] = useState([])
    const currentUser = parseInt(localStorage.getItem("userId"))
    const [gameImage, setGameImage] =useState({
        gameId: parseInt(gameId),
        image: ""
    })
    const [gamePics, setGamePics] =useState([])

    useEffect(() => {
        getRatings().then(setRatings)
    }, [])



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

    useEffect(() => {
        getImages().then(setGamePics)
    }, [])

    const ratings_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const submitRating = () => {
        const newRating = {
            rating: rating.rating,
            game: gameId
        }
        createRating(newRating).then(history.push("/games"))
    }

    const found = ratings.find(ratingObj => ratingObj.player?.user === currentUser && ratingObj.game?.id === parsedId)

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            const copy = {...gameImage}
            copy.image = base64ImageString
            setGameImage(copy)
            // Update a component state variable to the value of base64ImageString
        });
    }

    return (
        <>
            <div>Title:    {game.title}</div>
            <div>Description:   {game.description}</div>
            <div>Designer:    {game.designer}</div>
            <div>Year Released:    {game.year_released}</div>
            <div>Number of Players:    {game.number_of_players}</div>
            <div>Estimated time to play:   {game.est_time_to_play}</div>
            <div>Age Recommendation:    {game.age_recomendation}</div>
            <div>
                {/* <img src={`${game.pic}`} /> */}
                {
                    gamePics.map((game) => {
                        return <>
                        <img alt="img" src={`${game.pic}`} />
                        <button onClick={() => {deleteImage(game.id).then(setGamePics)}}>Delete</button>
                        </>

                    })
                }

            </div>
            <div>Category: {game.category?.title}</div>
            <button onClick={() => { history.push(`/games/${game.id}/review`) }}>Review Game</button>
            <div>
                {
                    found ? "" :
                        <div>
                            <label>Rating: </label>
                            <select
                                onChange={
                                    (evt) => {
                                        const copy = { ...rating }
                                        copy.rating = evt.target.value
                                        setRating(copy)
                                    }}>
                                <option>Rating</option>
                                {
                                    ratings_array.map((rating) => {
                                        return <option value={rating}>{rating}</option>
                                    })
                                }
                            </select>
                            <button onClick={submitRating}>Submit Rating</button>
                        </div>
                }

            </div>
            <div>
                Average Rating: {game.average_rating}
            </div>
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
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={game.id} />
            <button onClick={() => {
                // Upload the stringified image that is stored in state
                createImage(gameImage).then(getImages).then(setGamePics)
            }}>Upload</button>
        </>
    )
}