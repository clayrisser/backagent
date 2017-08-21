import Service from 'trails/service';
import git from 'nodegit';
import fs from 'fs-extra-promise';
import boom from 'boom';

export default class GitService extends Service {

  async sync({origin, branch}) {
    const gitConfig = this.app.config.agents.git;
    if (!origin) origin = gitConfig.origin;
    if (!branch) branch = gitConfig.branch;
    const blogdownConfig = this.app.config.blogdown;
    return git.Repository.open(blogdownConfig.location).then(async (repo) => {
      await this.pull({repo, branch});
      return {
        action: 'pulled',
        repo,
        origin,
        branch
      };
    }).catch(async (err) => {
      if (err.errno === -3) { // location not found
        const repo = await this.clone({origin, branch});
        return {
          action: 'cloned',
          origin,
          branch,
          repo
        };
      }
      throw err;
    });
  }

  async clone({origin, branch, location}) {
    if (!location) location = this.app.config.blogdown.location;
    fs.mkdirsSync(location);
    const clone = git.Clone;
    const repo = await clone(origin, location, {
      checkoutBranch: branch
    }).catch((err) => {
      if (err.errno === -4) {
        throw boom.forbidden(err.message, {
          location: location
        });
      }
    });
    return repo;
  }

  async pull({repo, branch}) {
    await repo.fetchAll({}, true);
    await repo.mergeBranches(branch, `origin/${branch}`);
    return repo;
  }
}
