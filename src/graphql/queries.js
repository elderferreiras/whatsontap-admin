/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEstablishment = `query GetEstablishment($id: ID!) {
  getEstablishment(id: $id) {
    id
    name
    streetAddress
    city
    state
    zipcode
    phone
    website
    uid
    beers {
      items {
        id
        name
        description
        ibu
        abv
      }
      nextToken
    }
  }
}
`;
export const listEstablishments = `query ListEstablishments(
  $filter: ModelEstablishmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listEstablishments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      streetAddress
      city
      state
      zipcode
      phone
      website
      uid
      beers {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getBeer = `query GetBeer($id: ID!) {
  getBeer(id: $id) {
    id
    name
    description
    ibu
    abv
    establishment {
      id
      name
      streetAddress
      city
      state
      zipcode
      phone
      website
      uid
      beers {
        nextToken
      }
    }
  }
}
`;
export const listBeers = `query ListBeers(
  $filter: ModelBeerFilterInput
  $limit: Int
  $nextToken: String
) {
  listBeers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      ibu
      abv
      establishment {
        id
        name
        streetAddress
        city
        state
        zipcode
        phone
        website
        uid
      }
    }
    nextToken
  }
}
`;
