import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// export default function preview(req, res) {
//     // res.setPreviewData({});
//     res.setDraftMode({ enable: true });
//     res.writeHead(307, { Location: '/challenges' });
//     res.end('Draft mode is enabled');
// }

export async function GET(request) {
    draftMode().enable();
    // redirect('/challenges');
    return new Response('Draft mode is enabled');
}
