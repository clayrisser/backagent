/**
 * BlogDown Configuration
 * (app.config.blogdown)
 *
 * Configure BlogDown settings
 *
 * @see {@link https://blogdown.io}
 */

const e = process.env;

'use-strict';

module.exports = {

  contentPath: e.CONTENT_PATH ? e.CONTENT_PATH : './content',

  sync: {
    git: {
      username: e.GIT_USERNAME ? e.GIT_USERNAME : '',
      password: e.GIT_PASSWORD ? e.GIT_PASSWORD : '',
      repo: e.GIT_REPO ? e.GIT_REPO : '',
      branch: e.GIT_BRANCH ? e.GIT_BRANCH : 'origin/master'
    }
  }
};
