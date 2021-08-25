import { createCommand } from 'commander';
import { VieraClient } from 'panasonic-viera-ts';
import { createInterface } from 'readline';

const program = createCommand();
program.exitOverride();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(message: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(message, resolve);
  });
}

void (async () => {
  try {
    const host = await question('Input Viera IP Address > ');
    const viera = new VieraClient(host);
    await viera.displayPinCode('Viera Controller');
    const pinCode = await question('Input PinCode> ');
    const auth = await viera.requestAuth(pinCode);
    rl.write(`host: ${host}\n`);
    rl.write(`appId: ${auth.appId}\n`);
    rl.write(`encKey: ${auth.encKey}\n`);
  } catch (e) {
    rl.write(`error: ${e.message}\n`);
  }
  process.exit(0);
})();
