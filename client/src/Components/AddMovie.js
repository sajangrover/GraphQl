import React from 'react';
import {graphql} from 'react-apollo'
import {compose} from 'recompose'
import {getActorsQuery , addMovieMutation, getMoviesQuery} from '../queries/queries'


class AddMovie extends React.Component {

    constructor(props){
        super(props) 

        this.state ={
            name:'',
            genre:'',
            actorId:''
        }
    }
    displayActors =()=>{
        const data = this.props.getActorsQuery
        if(data.loading){
            return(
                <option disabled>Loading...</option>
            )
        }
        else{
            return data.actors.map(actor =>{
                return (
                    <option key={actor.id} value={actor.id}>{actor.name}</option>
                )
            })
        }
    }
    submitForm =(e)=>{
        e.preventDefault();
        this.props.addMovieMutation({
            variables :{
                name : this.state.name,
                genre : this.state.genre,
                actorId : this.state.actorId
            },
            refetchQueries:[{query : getMoviesQuery}]
        })
    }
    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div>
                    <label>Movie : </label>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                </div>
                <div>
                    <label>Genre : </label>
                    <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
                </div>
                <div>
                    <label>Actor : </label>
                    <select onChange={(e) => this.setState({actorId:e.target.value})}>
                        <option>Select Actor</option>
                        {this.displayActors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    };
}

export default compose(
    graphql(getActorsQuery ,{name:"getActorsQuery"}),
    graphql(addMovieMutation ,{name:"addMovieMutation"})
)(AddMovie);