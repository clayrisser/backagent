'use strict';

const Service = require('trails/service');
const Err = require('err');
const git = require('nodegit');
const _ = require('lodash');

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
    return git.Clone(blogdown.sync.git.repo, blogdown.contentPath).then(repo => {
      return {
        repo: repo,
        task: 'cloned'
      };
    }).catch(err => {
      var message = err.message;
      if (message.substr(message.length - 36, message.length) === 'exists and is not an empty directory') {
        return git.Repository.open(blogdown.contentPath).then(repo => {
          return {
            repo: repo,
            task: 'pulled'
          };
        });
      }
      throw err;
    }).then(d => {
      return d.repo.mergeBranches('master', blogdown.sync.git.branch).then(repo => {
        return {
          commit: repo,
          task: d.task
        };
      });
    });
  }
};
