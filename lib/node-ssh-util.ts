import SSH = require('node-ssh');


export class NodeSsh extends SSH {
  connection: any;

  constructor() {
    super();
  }

  async exec(command: string, options: { cwd?: string, stdin?: string, stream?: string } = {}): Promise<string | Object> {
    if (options.cwd) {
      // NOTE: Output piping cd command to hide directory non-existent errors
      command = `cd ${options.cwd} 1> /dev/null 2> /dev/null; ${command}`
    }
    return await new Promise((resolve, reject) => {
      console.log('$ ' + command);
      this.connection.exec(command, (error, stream) => {
        if (error) return reject(error);

        stream.on('close', function (code, signal) {
          return code === 0 ? resolve({ code, signal}) : reject({ code, signal});
        }).on('data', function (data) {
          process.stdout.write(data);
        }).stderr.on('data', function (data) {
          process.stderr.write(data.toString());
        });
      });
    })
  }
}
