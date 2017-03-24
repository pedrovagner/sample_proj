/**
 * Settings entry point.
 */
import * as fs from 'fs';
import * as fsx from '../lib/fsx';
import path = require('path');
import {Config} from './base';
import DevelopmentConfig from './development';
import ProductionConfig from './production';


let CaseConfig;


switch (process.env.NODE_ENV) {
  case 'production':
    CaseConfig = ProductionConfig;
    break;
  case 'development':
    if (fsx.isDirSync(path.join(__dirname, 'dev'))) {
      CaseConfig = require(path.join(__dirname, 'dev', 'index')).default
    } else {
      CaseConfig = DevelopmentConfig
    }
    break;
  default:
    throw new Error("NODE_ENV environment variable not defined.");
}

const config: Config = new CaseConfig();
export default config;

if (!fsx.isDirSync(config.data_base_dir)) fs.mkdirSync(config.data_base_dir);
if (!fsx.isDirSync(config.data_dir)) fs.mkdirSync(config.data_dir);
if (!fsx.isDirSync(config.media_dir)) fs.mkdirSync(config.media_dir);
if (!fsx.isDirSync(config.venv_dir)) fs.mkdirSync(config.venv_dir);
if (!fsx.isDirSync(config.log_dir)) fs.mkdirSync(config.log_dir);
