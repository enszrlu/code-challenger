import { groq } from 'next-sanity';
import { client } from '../../../../../lib/sanity.client';
// import PreviewSuspense from '@/components/PreviewSuspense';
// import { draftMode } from 'next/headers';
// import ChallengeList from '@/components/ChallengeList';
// import PreviewChallenges from '@/components/PreviewChallenges';
import { PortableText } from '@portabletext/react';
import { RichTextComponent } from '@/components/ChallengePage/RichTextComponent';

const query = groq`
    *[_type == "challenge" && slug.current == $slug][0] {
        ...,
        author->,
        categories[]->,
        difficulty->
    }
`;

//revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
    const challenges = await client.fetch(groq`
        *[_type == "challenge"] {
            slug
        }
    `);

    return challenges.map((challenge) => ({
        params: {
            slug: challenge.slug.current
        }
    }));
}

export default async function ChallengePage({ params: { slug } }) {
    // if (draftMode().isEnabled) {
    //     return (
    //         <PreviewSuspense fallback={<div>Loading...</div>}>
    //             <PreviewChallenges query={query}></PreviewChallenges>
    //         </PreviewSuspense>
    //     );
    // }

    // // add 5 second delay to simulate slow connection
    // // await new Promise((resolve) => setTimeout(resolve, 5000));

    const challenge = await client.fetch(query, { slug });

    // if (!challenges.length) {
    //     return <div>Loading...</div>;
    // }
    // return <ChallengeList challenges={challenges}></ChallengeList>;
    return (
        <div>
            <PortableText
                // Pass in block content straight from Sanity.io
                value={challenge.description}
                // Optionally override marks, decorators, blocks, etc. in a flat
                // structure without doing any gymnastics
                components={RichTextComponent}
            />
        </div>
    );
}
