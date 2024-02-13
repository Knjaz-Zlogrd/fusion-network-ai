import {useMatch} from 'react-router-dom';

export default function useRouteMatchValue<T>(
  route: {path: string},
  values: [T, T],
) {
  return useMatch(route) ? values[0] : values[1];
}