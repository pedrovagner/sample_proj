interface Error {
  status?: number;
}


declare module 'gulp-postcss';
declare module 'autoprefixer';

declare namespace i18n {
  export function __l(phrase: string, ...replace: string[]): string;
}

declare module 'postcss-css-variables';

declare module 'node-ssh' {
  interface ConfigGiven {
    host: string,
    port?: number | string,
    username: string,
    password?: string,
    privateKey?: string,
  }

  class SSH {
    constructor();
    connect(givenConfig: ConfigGiven): Promise<this>;
    // exec(command: string, options: { cwd?: string, stdin?: string, stream?: string }): Promise<string | Object>
  }

  export = SSH;
}
