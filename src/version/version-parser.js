import Version from './version';
import { LATEST, LATEST_TESTED_MARK } from '../constants';
import { contains } from '../utils';
import { InvalidVersion } from './exceptions';

function isLatest(versionStr: string): boolean {
  return versionStr === LATEST;
}

function isLatestTested(versionStr: string) {
  if (!contains(versionStr, LATEST_TESTED_MARK)) return false;
  const splited = versionStr.split(LATEST_TESTED_MARK);
  if (splited.length !== 2) return false;
  const [, numberStr] = splited;
  const version = parseInt(numberStr);
  if (!version) return false; 
  return true;
}

function isRegular(versionStr: string) {
  return !!parseInt(versionStr);
}

function returnRegular(versionStr: string) {
  return new Version(parseInt(versionStr), false);
}

function returnLatestTestedVersion(versionStr: string): Version {
  const [, numberStr] = versionStr.split(LATEST_TESTED_MARK);
  return new Version(parseInt(numberStr), true);
}

function returnLatest(): Version {
  return new Version(null, true);
}

export default function versionParser(versionStr: string): Version {
  if (isLatest(versionStr)) return returnLatest();
  if (isLatestTested(versionStr)) return returnLatestTestedVersion(versionStr);
  if (isRegular(versionStr)) return returnRegular(versionStr);
  throw new InvalidVersion(); 
}
