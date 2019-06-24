import { gql } from 'apollo-boost'

export const ITEM_SUBSCRIPTION = gql`
  subscription {
    item {
      mutation
      data {
        id 
        itemsid
      }
    }
  }
`