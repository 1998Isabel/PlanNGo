import { gql } from 'apollo-boost'

export const CREATE_ITEM = gql`
  mutation createItem(
    $id: String!
    $description: String!
    $placeid: String!
    $name: String!
    $type: String!
    $photo: String
    $price: Int
  ) {
    createItem(
      id: $id
      data: {
        place: {
          description: $description
          placeid: $placeid
          name: $name
          type: $type
          photo: $photo
          price: $price
        }
      }
    ) {
      id
      place {
        name
      }
    }
  }
`

export const UPDATE_DND_ITEM = gql`
  mutation updateDnDItem(
    $droppableId: String!
    $destination_droppableId: String!
    $destination_index: String!
    $source_droppableId: String!
    $source_index: String!
  ) {
    updateDnDItem(
      id: $id
      data: {

          droppableId: $droppableId
          destination_droppableId: $destination_droppableId
          destination_index: $destination_index
          source_droppableId: $source_droppableId
          source_index: $source_index
      }
    ) {
      days
    }
  }
`