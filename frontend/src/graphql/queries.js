import { gql } from 'apollo-boost'

export const DAYS_INFO = gql`
  query {
      users {
          token
          totalDays
          days {
              id
              items {
                  id
                  description
              }
          }
      }
  }

`