/**
 * Project development configuration.
 */
import os = require('os');
import path = require('path');
import * as base from '../../setting/base';


/** Project configuration. */
export default class DevConfig extends base.Config {
  debug = true;
  database = `mongodb://localhost:37017/${this.proj_name}_dev`;
  data_base_dir = path.join(os.homedir(), 'dev');
  data_dir = path.join(this.data_base_dir, this.proj_name);
  log_dir = path.join(this.data_dir, 'log');
  media_dir = path.join(this.data_dir, 'media');
  secret = 'EdXbciPURaur4Jo5KBYTkZpkTaeAtNc2P3TADMPoy';
}
