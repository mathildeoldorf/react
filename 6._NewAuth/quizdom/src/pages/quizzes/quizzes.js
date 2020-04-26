import Axios from "axios"
import React, { useState, useEffect, useReducer } from "react"
import "./quizzes.css"
import Key from "./../../data/api.json"
const categoryUrl = Key.APIcategories 
const quizUrl = Key.APIquiz

export default function Categories () {
    const [ quizCategories, setQuizCategories ] = useState([])

    const [ quizCategory, setQuiz ] = useState()

    useEffect(() => {
        fetchQuizCategories();
    }, [])

    const fetchQuizCategories = async () => {
        await Axios.get(categoryUrl)
        .catch(error => console.log('Error fetching ', error ))
        .then(response => 
            response.data.trivia_categories.map(
                category => ({
                    id: `${category.id}`,
                    name: `${category.name}`
                })   
            )
        )
        .then( data => {
            setQuizCategories(data)
        })
    }

    const handleCategorySelection = async (event) => {
        const categoryID = event.target.id
        console.log(categoryID)

        // window.location = "/quizzes/" + categoryID
        fetchSingleQuiz(categoryID)

    }

    const fetchSingleQuiz = async (categoryID) => {
        await Axios.get(quizUrl+categoryID)
        .catch(error => console.log('Error fetching ', error ))
        .then(response => 
            // console.log(response)
            response.data.results.map(
                question => ({
                    question: `${question.question}`,
                    incorrect_answers: `${question.incorrect_answers}`,
                    correct_answer: `${question.correct_answer}`
                })
            )
        )
        .then (data => {
            console.log(data)
        })
    }

    return(
        <section className="quizzes">
            <div className="categories">
                { quizCategories.map( category => (
                <button id={category.id} key={category.id} className={"category"} onClick={handleCategorySelection}>
                    <h2>{category.name}</h2>
                </button>
                )) }
            </div>
        </section>
    )
}