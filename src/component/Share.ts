import DebugLog from '@/lib/DebugLog';
import { Container } from '@/component/Container';

export class Share {
  public static choseObjectName: string | null = null;
}

export const getUrlParam = (name: string): string => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
};
