import Gratitude from '../models/Gratitude';

export default async (gratitudes) => {
  const formattedGratitudes = gratitudes.map((g) => {
    const fg = {};
    fg.text = g;
    return fg;
  });

  return Gratitude.create(formattedGratitudes)
    .catch((err) => console.error(err));
}