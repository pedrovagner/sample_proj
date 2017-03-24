/**
 * Project development configuration (NODE_ENV=development).
 */
import * as base from './base';


/** Project development configuration. */
export default class DevelopmentConfig extends base.Config {
  debug = true;
  secret = 'EdXbciPURaur4Jo5KBYTkZpkTaeAtNc2P3TADMPoy';
}
