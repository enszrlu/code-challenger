export default {
    name: 'challenge',
    title: 'Challenge',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' }
        },
        {
            name: 'desktopDesign',
            title: 'Desktop Design',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text'
                }
            ]
        },
        {
            name: 'mobileDesign',
            title: 'Mobile Design',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text'
                }
            ]
        },
        {
            name: 'tabletDesign',
            title: 'Tablet Design',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text'
                }
            ]
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }]
        },
        {
            name: 'difficulty',
            title: 'Difficulty',
            type: 'reference',
            to: { type: 'difficulty' }
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime'
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'blockContent'
        },
        {
            name: 'assets',
            title: 'Assets Provided',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'assets' } }]
        },
        {
            name: 'figma_url',
            title: 'Figma URL',
            type: 'url'
        },
        {
            title: 'Files (zip or rar)',
            name: 'files',
            type: 'file',
            options: {
                accept: '.zip,.rar'
            }
        },
        {
            title: 'Approved',
            name: 'approved',
            type: 'boolean'
        }
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'desktopDesign'
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        }
    }
};
