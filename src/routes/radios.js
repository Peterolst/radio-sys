import Radios from '../controllers/radios';

import { wrapAsync } from '../utils/controllers';

// endpoints for radios
module.exports = api => {
    api.route('/radios').get(wrapAsync(Radios.getRadios));
    api.route('/radios/:id').post(wrapAsync(Radios.storeRadioProfile));
    api.route('/radios/:id/location').post(wrapAsync(Radios.setLocation));
    api.route('/radios/:id/location').get(wrapAsync(Radios.getLocation));
    api.route('/radios').delete(wrapAsync(Radios.clearAllRadios));
};
