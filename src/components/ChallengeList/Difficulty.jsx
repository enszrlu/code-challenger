import React from 'react';

function Difficulty({ level, name }) {
    let color = '';
    let border = '';
    let text = '';
    let bg = '';

    switch (level) {
        case 1:
            color = 'red-300';
            border = 'border-red-300';
            text = 'text-red-300';
            bg = 'bg-red-300';
            break;
        case 2:
            color = 'css';
            border = 'border-css';
            text = 'text-css';
            bg = 'bg-css';
            break;
        case 3:
            color = 'html';
            border = 'border-html';
            text = 'text-html';
            bg = 'bg-html';
            break;
        case 4:
            color = 'primary';
            border = 'border-primary';
            text = 'text-primary';
            bg = 'bg-primary';
            break;
        case 5:
            color = 'secondary';
            border = 'border-secondary';
            text = 'text-secondary';
            bg = 'bg-secondary';
            break;
    }

    return (
        <div
            className={`flex border-2 rounded-lg text-sm ${border} overflow-hidden max-w-[40%] items-center`}
        >
            <p className={`${bg} px-2 text-white h-full flex items-center`}>{level}</p>
            <p className={`mx-2 ${text}`}>{name}</p>
        </div>
    );
}

export default Difficulty;
