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
    $lat: Float!
    $lng: Float!
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
          location: [$lat, $lng]
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