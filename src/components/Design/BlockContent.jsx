'use client';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toolbarOptions from '@/../lib/quillToolbar';

// Define Modules for ReactQuill
const modules = {
    toolbar: toolbarOptions
};

function BlockContent({ setDescription }) {
    return <ReactQuill theme="snow" onChange={setDescription} modules={modules} />;
}

export default BlockContent;
