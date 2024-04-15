export const capitalize = (str: string) =>
  str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); // function to capitalize string in JS

export const connectToAPI = async ({ endpoint }: { endpoint: string }) => {
  const url = endpoint.includes('http')
    ? endpoint
    : `${process.env.API_URL}api/${endpoint}`;

  console.log(url);

  const res = await fetch(url, { method: 'GET' });

  if (!res.ok) {
    const text = JSON.parse(await res.text());

    throw new Error(text.message);
  }

  const data = await res.json();

  return data;
};
