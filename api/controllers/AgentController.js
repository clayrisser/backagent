import Controller from 'trails/controller';
import _ from 'lodash';

export default class AgentController extends Controller {

  gitSync(req, res, next) {
    const s = this.app.services;
    return s.GitService.sync({}).then((payload) => {
      return res.json({
        message: `${_.startCase(payload.action)} branch '${payload.branch}'` +
          ` from origin '${payload.origin}'`,
        payload: {
          action: payload.action,
          origin: payload.origin,
          branch: payload.branch
        }
      });
    }).catch(next);
  }
}
