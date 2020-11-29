import React from 'react'
import axios from 'axios'

function About() {

    function renderGenerateErr() {
        return (
            <div>
                <span>Generate a NPE for log: </span>
                <button onClick={generateErr}>Generate</button>
            </div>
        )
    }

    function generateErr() {
        axios.get('/posts/err')
    }

    return (
        <div>
            <h2>About</h2>
            {renderGenerateErr()}
        </div>
    )
}

export default About