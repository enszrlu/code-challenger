import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';
// import { previewData } from 'next/headers';
import { draftMode } from 'next/headers';
import ChallengeList from '@/components/ChallengeList';
import PreviewChallenges from '@/components/PreviewChallenges';
import ChallengeHeader from '@/components/ChallengeHeader';

const query = groq`
    *[_type == "challenge"] {
        ...,
        author->,
        categories[]->,
        difficulty->
    } | order(_createdAt desc)
`;

export default async function Challenges() {
    if (draftMode().isEnabled) {
        return (
            <PreviewSuspense fallback={<div>Loading...</div>}>
                <PreviewChallenges query={query}></PreviewChallenges>
            </PreviewSuspense>
        );
    }
    const challenges = await client.fetch(query);
    if (!challenges.length) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {/* Challenges Header */}
            <ChallengeHeader></ChallengeHeader>
            {/* Challenges */}
            <ChallengeList challenges={challenges}></ChallengeList>
        </div>
    );
}
