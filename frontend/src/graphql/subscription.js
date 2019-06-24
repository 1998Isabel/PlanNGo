import { gql } from 'apollo-boost'

export const MAPITEM_SUBSCRIPTION = gql`
  subscription {
    mapitem {
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
  subscription item($id:String!){
    item {
      mutation
      data {
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
    }
  }
`

export const ITEMINFO_SUBSCRIPTION = gql`
  subscription {
    iteminfo {
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