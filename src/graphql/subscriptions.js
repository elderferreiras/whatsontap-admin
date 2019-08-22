/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEstablishment = `subscription OnCreateEstablishment {
  onCreateEstablishment {
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
export const onUpdateEstablishment = `subscription OnUpdateEstablishment {
  onUpdateEstablishment {
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
export const onDeleteEstablishment = `subscription OnDeleteEstablishment {
  onDeleteEstablishment {
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
export const onCreateBeer = `subscription OnCreateBeer {
  onCreateBeer {
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
export const onUpdateBeer = `subscription OnUpdateBeer {
  onUpdateBeer {
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
export const onDeleteBeer = `subscription OnDeleteBeer {
  onDeleteBeer {
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
