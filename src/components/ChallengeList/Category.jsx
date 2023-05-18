import React from 'react';

function Category({ category }) {
    let color = '';
    if (!category) {
        return;
    }

    switch (category) {
        case 'API':
            color = 'text-secondary';
            break;
        case 'JS':
            color = 'text-primary';
            break;
        case 'HTML':
            color = 'text-html';
            break;
        case 'CSS':
            color = 'text-css';
            break;
        default:
        // code block
    }

    return <p className={`${color} font-extrabold lg:text-lg`}>{category}</p>;
}

export default Category;
