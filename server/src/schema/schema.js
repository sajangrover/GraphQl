const graphql = require('graphql')
const _ = require('lodash')

const Movie = require('../models/movie')
const Actor = require('../models/actor')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// const movies =[
//     {name :'avenger infinity war' , genre:'Sci-Fi',id:'1',actorId :'1'},
//     {name :'Andaaj Apna Apna' , genre:'Comedy',id:'2',actorId :'2'},
//     {name :'Bhoot' , genre:'Horror',id:'3',actorId :'3'},
//     {name :'Dangal' , genre:'Action',id:'4',actorId :'2'},
//     {name :'3 Idiots' , genre:'Comedy',id:'5',actorId :'2'},
//     {name :'Uri' , genre:'Action',id:'6',actorId :'3'},
// ]

// const actors = [
//     {name : 'iron man' , age:40  , id:'1'},
//     {name : 'Amir khan' , age:50  , id:'2'},
//     {name : 'vicky kaushal' , age:30 , id:'3'},
// ]

const MovieType = new GraphQLObjectType({
    name: 'MOVIE',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        actorId :{type : GraphQLString},
        actor: {
            type: ActorType,
            resolve(parent, args) {
                //console.log(parent)
                // return _.find(actors,{id : parent.actorId})
                return Actor.findById(parent.actorId)
            }
        }
    })
});
const ActorType = new GraphQLObjectType({
    name: 'ACTOR',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movie: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return _.filter(movies ,{actorId : parent.id})
                return Movie.find({
                    actorId : parent.id
                })
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(movies,{id : args.id})
                return Movie.findById(args.id)
            }
        },
        actor: {
            type: ActorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(actors,{id: args.id})
                return Actor.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies
                return Movie.find({})
            }
        },
        actors: {
            type: new GraphQLList(ActorType),
            resolve(parent, args) {
                // return actors
                return Actor.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addActor: {
            type: ActorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let actor  = new Actor({
                    name : args.name,
                    age : args.age,
                });
                return actor.save();
            }
        },
        addMovie :{
            type:MovieType,
            args :{
                name: { type: new GraphQLNonNull( GraphQLString )},
                genre: { type: new GraphQLNonNull(GraphQLString )},
                actorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent,args){
                let movie = new Movie({
                    name : args.name,
                    genre :args.genre,
                    actorId : args.actorId
                });

                return movie.save();

            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
   mutation : Mutation
})