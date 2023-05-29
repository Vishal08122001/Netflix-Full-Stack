import React from 'react'
import CardSlider from './CardSlider'

const Slider = ({ movies }) => {
    const getMoviesFromRange = (from, too) => {
        return movies.slice(from, too)
    }
    return (
        <div>
            <CardSlider title='Trending Now' data={getMoviesFromRange(0, 10)} />
            <CardSlider title='New Releases' data={getMoviesFromRange(10, 20)} />
            <CardSlider title='Blockbuster' data={getMoviesFromRange(20, 30)} />
            <CardSlider title='Netflix Popular' data={getMoviesFromRange(30, 40)} />
            <CardSlider title='Action Movies' data={getMoviesFromRange(40, 50)} />
            <CardSlider title='Epics' data={getMoviesFromRange(50, 60)} />

        </div>
    )
}

export default Slider
