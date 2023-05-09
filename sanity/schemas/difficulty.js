export default {
    name: 'difficulty',
    title: 'Difficulty',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Difficulty Name',
            type: 'string'
        },
        {
            name: 'level',
            title: 'Difficulty Level',
            type: 'number'
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'level'
        }
    }
};
