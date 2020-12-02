import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

export { useHistory, useLocation, useParams, useRouteMatch };

interface QueryParams {
  [key: string]: string;
}
export function useQuery(): QueryParams {
  //   return new URLSearchParams(useLocation().search);

  const search = useLocation().search;

  // 简易格式校验 ?[key]=[value]
  if (search.indexOf('?') !== 0 || search.indexOf('=') === -1) return {};

  try {
    const query: QueryParams = {};
    const arrs = search.slice(1).split('&');
    arrs.forEach(item => {
      if (item.indexOf('=') !== -1) {
        query[item.split('=')[0]] = item.split('=')[1];
      }
    });
    return query;
  } catch (err) {
    console.error(err);
    return {};
  }
}
