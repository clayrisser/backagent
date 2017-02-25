'use strict';

const Controller = require('trails/controller');
const checkParams = require('check-params');

/**
 * @module SyncController
 * @description Handles one way sync.
 */
module.exports = class SyncController extends Controller {

  sync(req, res) {
    const s = this.app.services;
    return checkParams(req, {
      urlParams: [ 'system' ]
    }).then(message => {
      return s.SyncService.sync(req.params.system).then(data => {
        res.success(data, data.commit + ' was ' + data.task);
      });
    }).catch(err => res.error(err));
  }
};
