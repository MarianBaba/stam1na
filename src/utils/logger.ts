import { getCurrentTimestamp } from './time';

export function log(message: string) {
  console.log(`[ ${getCurrentTimestamp()} ] ${message}`);
}
