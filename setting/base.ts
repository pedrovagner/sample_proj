/**
 * Common settings to all configurations (development and production).
 */
import * as path from 'path';


export abstract class Config {
  debug: boolean;
  secret: string;
  proj_dir = path.dirname(__dirname);
  proj_name = path.basename(this.proj_dir);
  proj_name_alt = 'sample';
  site_title = 'Sample Project';
  // site_description = 'Pedro Vagner';
  database: string;
  data_base_dir: string;
  data_dir: string;
  log_dir: string;
  media_url = '/media';
  media_dir: string;  /** Media root directory. */
  venv_dir: string;  /** Python Virtual Env directory. */
  static_url = '/static';
  static_dir = path.join(this.proj_dir, 'static_root');  /** Static root directory. */

  deploy_user = 'pi';
  deploy_group = 'www-data';
  webapp_port = '8060';

  remote_user = 'pi';
  remote_host = '192.168.1.100';
  remote_port = '22';
  remote_prog_dir = path.join(path.sep, 'home', this.remote_user, 'prog');
  remote_proj_dir = path.join(this.remote_prog_dir, this.proj_name);

  www_dir = path.join(path.sep, 'var', 'www');
}
