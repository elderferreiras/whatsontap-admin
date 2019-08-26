/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEstablishment = `mutation CreateEstablishment($input: CreateEstablishmentInput!) {
  createEstablishment(input: $input) {
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
export const updateEstablishment = `mutation UpdateEstablishment($input: UpdateEstablishmentInput!) {
  updateEstablishment(input: $input) {
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
export const deleteEstablishment = `mutation DeleteEstablishment($input: DeleteEstablishmentInput!) {
  deleteEstablishment(input: $input) {
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
export const createBeer = `mutation CreateBeer($input: CreateBeerInput!) {
  createBeer(input: $input) {
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
export const updateBeer = `mutation UpdateBeer($input: UpdateBeerInput!) {
  updateBeer(input: $input) {
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
export const deleteBeer = `mutation DeleteBeer($input: DeleteBeerInput!) {
  deleteBeer(input: $input) {
    id
    name
    description
    ibu
    abv
  }
}
`;
