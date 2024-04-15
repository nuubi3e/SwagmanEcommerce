import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';

export const GenerateStars = (num: number) => {
  const starCount = num.toString().split('.');
  const stars: JSX.Element[] = [];

  // Adding Full Stars
  for (let i = 0; i < +starCount[0]; i++)
    stars.push(<FaStar key={Math.random().toString()} />);

  // Adding a half start if there is some decimal value
  starCount[1] &&
    stars.push(<FaStarHalfStroke key={Math.random().toString()} />);

  // now filling rest array space with empty starts
  while (stars.length !== 5) {
    stars.push(<FaRegStar key={Math.random().toString()} />);
  }

  return stars;
};
