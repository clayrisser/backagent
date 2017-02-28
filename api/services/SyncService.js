'use strict';

const Service = require('trails/service');
const Err = require('err');
const _ = require('lodash');
const simpleGit = require('simple-git');
const fs = require('extfs');

/**
 * @module SyncService
 * @description Handles one way sync
 */
module.exports = class SyncService extends Service {

  sync(system) {
    switch(system) {
    case 'git':
      return this._gitSync();
      break;
    default:
      return Promise.reject(new Err('Invalid sync system', 400));
      break;
    }
  }

  _gitSync() {
    const blogdown = this.app.config.blogdown;
    const git = blogdown.sync.git;
    return new Promise((resolve, reject) => {
      fs.isEmpty(blogdown.contentPath, (empty) => {
        if (empty) {
          simpleGit(blogdown.contentPath.match(/.+(?=\/)/g)[0]).clone(git.repo, blogdown.contentPath, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        } else {
          simpleGit(blogdown.contentPath).pull('origin', 'master', (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        }
      });
    }).then(result => {
      return result;
    });
  }
};
