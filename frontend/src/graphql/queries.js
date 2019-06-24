import { gql } from 'apollo-boost'

// export const DAYS_INFO = gql`
//   query {
//       users {
//           token
//           totalDays
//           days {
//               id
//               items {
//                   id
//                   description
//               }
//           }
//       }
//   }

// `
export const LOGIN_MATCH = gql`
    query loginMatch($hash: String!){
        loginMatch(id: $hash)
    }
`

export const MAP_ITEMS = gql`
    query {
        items {
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
`

export const DAYS_INFO = gql`
  query {
      users {
          token
          totalDays
          days {
              id
              items {
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
