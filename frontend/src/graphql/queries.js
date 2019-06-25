import { gql } from 'apollo-boost'

export const LOGIN_MATCH = gql`
    query loginMatch($hash: String!){
        loginMatch(id: $hash)
    }
`

export const MAP_ITEMS = gql`
    query items($userID: String!){
        items(id: $userID) {
            id
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
  query users($userID: String!){
      users(id: $userID) {
          token
          totalDays
          days {
              id
              items(id: $userID) {
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

export const PROJECT_NAME = gql`
  query users($userID: String!){
      users(id: $userID) {
          projectName
      }
  }
`
