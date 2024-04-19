import { Log } from '../logs';

export const capitalize = (str: string) =>
  str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); // function to capitalize string in JS

export const connectToAPI = async ({
  endpoint,
  noCache,
}: {
  endpoint: string;
  noCache?: boolean;
}) => {
  console.clear();
  const url = endpoint.includes('http')
    ? endpoint
    : `${
        process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
      }api/${endpoint}`;

  Log.log('URL: ', url);
  Log.log('INFO: ', {
    method: 'GET',
    cache: noCache ? 'no-cache' : 'force-cache',
  });

  const res = await fetch(url, {
    method: 'GET',
    cache: noCache ? 'no-cache' : 'default',
  });

  if (!res.ok) {
    const text = JSON.parse(await res.text());

    throw new Error(text.message);
  }

  const data = await res.json();

  Log.log('RES: ', data);

  return data;
};
