const addressSelector = (place) => {
    const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    let values = {};

    for (let i = 0; i < place.address_components.length; i++) {
        let addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            values[addressType] = place.address_components[i][componentForm[addressType]];
        }
    }

    return {
        name: place.name,
        streetAddress: values.street_number + ' ' + values.route,
        city: values.locality,
        state: values.administrative_area_level_1,
        zipcode: values.postal_code,
        uid: place.place_id,
    };
};

export default addressSelector;