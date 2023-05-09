// export default function exit(req, res) {
//     // res.clearPreviewData();
//     res.setDraftMode({ enable: false });
//     res.writeHead(307, { Location: '/' });
//     res.end();
// }

import { draftMode } from 'next/headers';

export async function GET(request) {
    draftMode().disable();
    return new Response('Draft mode is disabled');
}
