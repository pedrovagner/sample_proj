// import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
// import * as fsx from '../lib/fsx';
import config from './index';
import debug_module = require('debug');


export const debug = debug_module('sample_proj:server');


// Logger used to save on database
export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: config.debug ? 'silly' : 'info'}),
    new winston.transports.File({
      name: 'error',
      level: 'warn',
      filename: path.join(config.log_dir, 'error.log'),
      maxsize: 1000 * 1000,  // 1 MB
      maxFiles: 3
    }),
    new winston.transports.File({
      name: 'info',
      level: 'info',
      filename: path.join(config.log_dir, 'info.log'),
      maxsize: 1000 * 1000,  // 1 MB
      maxFiles: 3
    }),
  ],
  exitOnError: false
});

// Logger used only do inform database log errors.
winston.add(winston.transports.File, {
  filename: path.join(config.log_dir, 'winston.log'),
  maxsize: 1000 * 1000,  // 1 MB
  maxFiles: 3
});

(winston as any).exitOnError = false;

export const logger_file = winston;
export const logger_console = new winston.Logger({transports: [
      new winston.transports.Console({colorize: true})
]});
