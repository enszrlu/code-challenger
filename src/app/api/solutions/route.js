import { NextResponse } from 'next/server';
import { fetchSolutions } from '@/../lib/firebase_DatabaseFuncs';
import { useSearchParams } from 'next/navigation';

export async function GET(request) {
    // Get query info
    const { searchParams } = new URL(request.url);
    let limit = 0;
    // Get limit from query
    if (searchParams) {
        limit = searchParams.get('limit') || 0;
    }

    const response = await fetchSolutions(parseInt(limit));
    // Return data as a JSON response
    return NextResponse.json(response);
}
