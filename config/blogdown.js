import path from 'path';
import homedir from 'homedir';

export default {
  location: process.env.BLOGDOWN_LOCATION || path.resolve(homedir(), 'blogdown')
};
