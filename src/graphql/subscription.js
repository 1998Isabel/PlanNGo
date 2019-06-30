import { gql } from 'apollo-boost'

export const MAPITEM_SUBSCRIPTION = gql`
  subscription mapitem($userid: String!){
    mapitem(userid: $userid) {
      mutation
      data {
        id,
        place {
          placeid
          location
          description
          name
          price
          type
      }
      }
    }
  }
`

export const ITEM_SUBSCRIPTION = gql`
  subscription item(
    $userid: String!
    $id: String!
    ){
    item(userid: $userid) {
      mutation
      data {
        days {
          id 
          itemsid
          items(id: $id) {
            id
            place {
                name
                description
                placeid
                name
                type
                duration
                photo
                price
            }
          }
        }
        totalDays
        firstDay
      }
    }
  }
`


export const ITEMINFO_SUBSCRIPTION = gql`
  subscription iteminfo($userid: String!) {
    iteminfo(userid: $userid) {
      mutation
      data {
        id
        place {
            name
            description
            placeid
            name
            type
            duration
            photo
            price
        }
      }
    }
  }
`