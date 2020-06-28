import { gql } from 'apollo-boost';

const getActorsQuery = gql`
    {
        actors {
            id
            name 
        }
    }
`

const getMoviesQuery = gql`
    {
        movies {
            id
            name 
            genre
        }
    }
`

const addMovieMutation = gql`
    mutation($name:String!,$genre:String!,$actorId:ID!){
        addMovie(name :$name,genre :$genre , actorId:$actorId){
            name
            id
        }
    }
`

const getMovieQuery = gql`
    query($id:ID){
        movie(id:$id){
            id
            name
            genre
            actor{
                id
                name
                age
                movie{
                    id
                    name
                }
            }
        }
    }
`

export { getMoviesQuery, getActorsQuery, addMovieMutation, getMovieQuery };