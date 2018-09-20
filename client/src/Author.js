import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_AUTHOR_RAW_QUERY = `query query($id: ID) {
  author(id: $id) {
    name
    books {
      title
      __typename
    }
    __typename
  } 
}`

export const GET_AUTHOR_QUERY = gql`${GET_AUTHOR_RAW_QUERY}`

export const Author = ({id}) => (
  <Query query={GET_AUTHOR_QUERY} variables={{id}}>
    {({ loading, error, data }) => {
      if (loading) return (<div>Loading...</div>);
      if (error) return (<div>Error :(</div>);
      return (
        <div>
          <div>{data.author.name}</div>
          <ul>
            { data.author.books.map( ({title}) => (<li key={title}>{title}</li>) ) }
          </ul>
        </div>
      )
    }}
  </Query>
)
