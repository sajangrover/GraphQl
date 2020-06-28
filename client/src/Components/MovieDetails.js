import React from 'react';
import {graphql} from 'react-apollo'

import {getMovieQuery} from '../queries/queries'

class MovieDetails extends React.Component {

    displayMoviedetail=()=>{
        const {movie} = this.props.data
        if(movie){
            return (
                <div>
                    <h2>{movie.name}</h2>
                    <p>{movie.genre}</p>
                    <p>{movie.actor.name}</p>
                    <p>All movies by the actor : </p>
                    <ul>
                        {
                            movie.actor.movie.map(item=>{
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.displayMoviedetail()}
            </div>
        )
    };
}

export default graphql(getMovieQuery,{
    options :(props)=>{
        return {
            variables:{
                id : props.movieId
            }
        }
    }
})(MovieDetails);
