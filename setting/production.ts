/**
 * Project production configuration (NODE_ENV=production).
 */
import os = require('os');
import path = require('path');
import * as base from './base';


const secret = process.env.SECRET;

if (typeof secret !== 'string' && process.env.NODE_ENV === 'production') {
  throw new Error("SECRET environment variable not defined.");
}

/** Project configuration. */
export default class ProductionConfig extends base.Config {
  debug = false;
  data_base_dir = path.join(os.homedir(), 'prod');
  data_dir = path.join(this.data_base_dir, this.proj_name);
  log_dir = path.join(this.data_dir, 'log');
  media_dir = path.join(this.data_dir, 'media');
  venv_dir = path.join(this.data_dir, 'venv');
  secret = secret;
}
