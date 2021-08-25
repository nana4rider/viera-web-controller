import { Appender, Configuration, DateFileAppender } from 'log4js';

const baseLogDir = '.data/log';

const appenders: { [name: string]: Appender } = {
  console: {
    type: 'console'
  },
  error: {
    type: 'logLevelFilter',
    appender: 'error_filtered',
    level: 'error'
  },
  error_filtered: dateFile('error.log', 10),
  system: dateFile('system.log', 10),
  access: dateFile('access.log', 10)
};

export const configures: { [key: string]: Configuration } = {};

// NODE_ENV=development
configures.development = {
  appenders: appenders,
  categories: {
    default: {
      appenders: ['error', 'console', 'system'],
      level: 'DEBUG'
    },
    access: {
      appenders: ['error', 'access'],
      level: 'DEBUG'
    }
  }
};

// NODE_ENV=production
configures.production = {
  appenders: appenders,
  categories: {
    default: {
      appenders: ['error', 'console', 'system'],
      level: 'INFO'
    },
    access: {
      appenders: ['error', 'access'],
      level: 'WARN'
    }
  }
};

function dateFile(fileName: string, daysToKeep: number): DateFileAppender {
  return {
    type: 'dateFile',
    filename: `${baseLogDir}/${fileName}`,
    pattern: '-yyyy-MM-dd',
    daysToKeep: daysToKeep
  };
}
