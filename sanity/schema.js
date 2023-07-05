import blockContent from './schemas/blockContent';
import category from './schemas/category';
import challenge from './schemas/challenge';
import author from './schemas/author';
import difficulty from './schemas/difficulty';
import assets from './schemas/assets';

export const schema = {
    name: 'default',
    types: [challenge, author, category, blockContent, difficulty, assets]
};
