'use strict';

var _radios = require('../controllers/radios');

var _radios2 = _interopRequireDefault(_radios);

var _controllers = require('../utils/controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// endpoints for radios
module.exports = api => {
    api.route('/radios').get((0, _controllers.wrapAsync)(_radios2.default.getRadios));
    api.route('/radios/:id').post((0, _controllers.wrapAsync)(_radios2.default.storeRadioProfile));
    api.route('/radios/:id/location').post((0, _controllers.wrapAsync)(_radios2.default.setLocation));
    api.route('/radios/:id/location').get((0, _controllers.wrapAsync)(_radios2.default.getLocation));
    api.route('/radios').delete((0, _controllers.wrapAsync)(_radios2.default.clearAllRadios));
};