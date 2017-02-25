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

  contentPath: e.CONTENT_PATH ? e.CONTENT_PATH : `${e.HOME}/blogdown/content`,

  sync: {
    git: {
      username: e.GIT_USERNAME ? e.GIT_USERNAME : 'jamrizzi',
      password: e.GIT_PASSWORD ? e.GIT_PASSWORD : 'password',
      repo: e.GIT_REPO ? e.GIT_REPO : 'https://github.com/thingdown/blogdown.git',
      branch: e.GIT_BRANCH ? e.GIT_BRANCH : 'origin/master'
    }
  }
};
