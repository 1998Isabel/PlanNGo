import { gql } from 'apollo-boost'

export const CREATE_ITEM = gql`
  mutation createItem(
    $id: String!
    $placeid: String!
    $name: String!
    $type: String!
    $note: String!
    $photo: String
    $price: Int
  ) {
    createItem(
      id: $id
      data: {
        placeid: $placeid
        name: $name
        type: $type
        note: $note
        photo: $photo
        price: $price
      }
    ) {
      id
      name
    }
  }
`