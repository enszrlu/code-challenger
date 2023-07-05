import { NextResponse } from 'next/server';
import { writeNewSolutionData } from '@/../lib/sanityDatabaseFunctions';

export async function POST(request) {
    // console.log('inside API');
    const data = await request.json();

    // Write data to the Sanity database
    const response = await writeNewSolutionData(data);

    // Return data as a JSON response
    return NextResponse.json(response);

    return NextResponse.error(error);
}
