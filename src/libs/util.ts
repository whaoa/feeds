import clsx from 'clsx';
import { format } from 'date-fns';

export const cn = clsx;

export function formatDate(date: string | number | Date, formatStr = 'yyyy-MM-dd HH:mm') {
  return format(date, formatStr);
}

export function request(url: string | URL | Request, options?: RequestInit) {
  const request = fetch(url, options).then((resp) => {
    if (!resp.ok) {
      return Promise.reject(new Error(`Request failed with status ${resp.status}`));
    }
    const json = resp.json;
    return Object.assign(resp, {
      json: <T = unknown>() => json.call(resp) as Promise<T>,
    });
  });
  return Object.assign(request, {
    text: () => request.then((resp) => resp.text()),
    json: <T = unknown>() => request.then((resp) => resp.json<T>()),
  });
};
