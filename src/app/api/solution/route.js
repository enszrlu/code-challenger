import { NextResponse } from 'next/server';
import { fetchSolution } from '@/../lib/firebase_DatabaseFuncs';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const response = await fetchSolution(id);

    // Return data as a JSON response
    return NextResponse.json(response);
}
