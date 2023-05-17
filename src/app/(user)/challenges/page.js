import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
// import { previewData } from 'next/headers';
import { draftMode } from 'next/headers';
import ChallengeList from '@/components/ChallengeList';
import PreviewChallenges from '@/components/PreviewChallenges';

const query = groq`
    *[_type == "challenge"] {
        ...,
        author->,
        categories[]->,
        difficulty->
    } | order(publishedAt desc)
`;

export default async function Challenges() {
    if (draftMode().isEnabled) {
        return (
            <PreviewSuspense fallback={<div>Loading...</div>}>
                <PreviewChallenges query={query}></PreviewChallenges>
            </PreviewSuspense>
        );
    }

    // add 5 second delay to simulate slow connection
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const challenges = await client.fetch(query);

    if (!challenges.length) {
        return <div>Loading...</div>;
    }
    return <ChallengeList challenges={challenges}></ChallengeList>;
}
