import * as cp from 'child_process';


// This should work, but isn't. See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Pulling_fields_from_objects_passed_as_function_parameter
// export function exec(cmd, {echo = true, ...options} = {}) {
export function exec(cmd, options: any = {}): Promise<string> {
  let echo = true;
  if ('echo' in options) echo = options.echo;
  delete options.echo;

  return new Promise((resolve, reject) => {
    if (echo) console.log('$ ' + cmd);
    let child = cp.exec(cmd, options, (error, stdout, stderr) => {
      // Annoying Node newline trailing. The reason that function existence.
      return error ? reject(error) : resolve(stdout.toString().replace(/\n$/, ''));
    });
    child.stdout.on('data', data => {
      if (echo) process.stdout.write(data.toString());
    });
    // child.on('error', error => {
    //   if (!cmd_shown && echo) console.log(cmd + '\n');
    //   cmd_shown = true;
    //   // if (echo) process.stderr.write(error.toString());
    // });
  });
}
