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
      fs.isEmpty(blogdown.contentPath, function(empty) {
        resolve(!empty);
      });
    }).then((exists) => {
      return new Promise((resolve, reject) => {
        let exec = require('child_process').exec;
        if (exists) { // pull
          exec(`git pull origin ${git.branch}`, (err, stdout) => {
            if (err) reject(err);
            resolve('Successfully pulled');
          });
        } else { // clone
          exec(`git clone ${git.repo} ${blogdown.contentPath}`, (err, stdout) => {
            if (err) reject(err);
            exec(`git checkout ${git.branch}`, (err, stdout) => {
              if (err) reject(err);
              resolve('Successfully cloned');
            });
          });
        }
      });
    }).then(result => {
      return result;
    });
  }
};
