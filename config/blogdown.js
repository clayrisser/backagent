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

  contentPath: e.CONTENT_PATH ? e.CONTENT_PATH : `${e.HOME}/blogdown`,

  sync: {
    git: {
      repo: e.GIT_REPO ? e.GIT_REPO : '',
      branch: e.GIT_BRANCH ? e.GIT_BRANCH : 'master'
    }
  }
};
