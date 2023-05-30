import SolutionPreview from '@/components/SubmitSolution/SolutionPreview';
import { SpinnerCircular } from 'spinners-react';
import { groq } from 'next-sanity';
import { client } from '../../../../../lib/sanity.client';

import { fetchSolutions } from '@/../lib/firebase_DatabaseFuncs';

export const revalidate = 60;

export async function generateStaticParams() {
    const response = await fetchSolutions();

    const solutions_object = response;

    const solutions = Object.keys(solutions_object).map((key) => {
        return key;
    });

    return solutions.map((solution) => ({
        params: {
            slug: solution
        }
    }));
}

const query = groq`
    *[_type == "challenge" && _id == $challenge][0] {
        ...,
        author->,
        categories[]->,
        difficulty->,
        assets[]->,
        "fileURL": files.asset->url
    }
`;

export default async function SolutionPage({ params: { slug } }) {
    const endpoint =
        (process.env.VERCEL_URL || 'http://127.0.0.1:3000') + '/api/solution?id=' + slug;

    const response = await fetch(endpoint);

    const solution = await response.json();

    const challengeResponse = await client.fetch(query, { challenge: solution.challenge });

    if (!solution)
        return (
            <div className="flex items-center justify-center my-auto h-96">
                <SpinnerCircular color="#26b4e3" />
            </div>
        );

    return <SolutionPreview solution={solution} challenge={challengeResponse} />;
}
