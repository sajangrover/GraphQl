import React from 'react';
import {graphql} from 'react-apollo'
import {getActorsQuery} from '../queries/queries'




class ActorList extends React.Component {


    render() {
        return (
            <div>
                <ul id = "movie-list">
                    <li>Actor-Name</li>
                </ul>
            </div>
        )
    };
}

export default graphql(getActorsQuery)(ActorList);
