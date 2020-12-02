import api from './index';

export function queryDemoList() {
  const url = `${A_SERVER}/testpath/queryDemoList`;
  return api.get(url, {}, true);
}
