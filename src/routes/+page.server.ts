import { getCards } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const result = await getCards();
  return { cards: result.posts.nodes };
};
