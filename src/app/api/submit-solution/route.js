import { NextResponse } from 'next/server';
import { writeNewSolutionData } from '@/../lib/firebase_DatabaseFuncs';
import urlSS from '@/../lib/urlScreenShot';

export async function POST(request) {
    const data = await request.json();

    const { error, desktop_screenshot, mobile_screenshot, tablet_screenshot } = await urlSS(
        data.live_url
    );

    if (error) return NextResponse.error(error);

    // Write data to the Realtime Database
    // { title, repo_url, live_url, summary, challenge, uid }
    const response = await writeNewSolutionData({
        ...data,
        desktop_screenshot,
        mobile_screenshot,
        tablet_screenshot
    });

    // Return data as a JSON response
    return NextResponse.json(response);
}
