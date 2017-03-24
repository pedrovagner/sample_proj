import * as path from 'path';
import * as i18n from 'i18n';
import config from './index';


i18n.configure({
  locales: ['en', 'pt'],
  cookie: 'locale',
  directory: path.join(config.proj_dir, '/locales')
});

export const __l = i18n.__l;
export const init = i18n.init;
