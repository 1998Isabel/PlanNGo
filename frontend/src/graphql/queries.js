import { gql } from 'apollo-boost'

export const ITEMS_QUERY = gql`
  query {
    items {
        id
        description
    }
  }
`