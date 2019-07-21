
let Measurements = {
    distance: function (locationFrom, locationTo) {
        if ((locationFrom.lat === locationTo.lat) && (locationFrom.lng === locationFrom.lng)) {
            return 0;
        } else {
            const radlat1 = Math.PI * locationFrom.lat / 180;
            const radlat2 = Math.PI * locationTo.lat / 180;
            const theta = locationFrom.lng - locationFrom.lng;

            const radtheta = Math.PI * theta / 180;

            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }

            dist = Math.acos(dist);

            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            return dist;
        }
    }
};

export default Measurements