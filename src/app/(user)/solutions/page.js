import { SpinnerCircular } from 'spinners-react';
import SolutionList from '@/components/SolutionList';
import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';

export const revalidate = 60;

const query = groq`
    *[_type == "challenge" && _id in $challenges] {
        ...,
        author->,
        categories[]->,
        difficulty->,
        assets[]->,
        "fileURL": files.asset->url
    }
`;

export default async function Solutions() {
    // add 5 second delay to simulate slow connection
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const endpoint = (process.env.NEXT_PUBLIC_URL || 'http://127.0.0.1:3000') + '/api/solutions';

    const response = await fetch(endpoint, { cache: 'no-store' });

    const solutions_object = await response.json();

    let challenges = [];

    // Convert solutions object to array with reverse order
    const solutions = Object.keys(solutions_object)
        .map((key) => {
            challenges.push(solutions_object[key].challenge);
            return {
                ...solutions_object[key],
                id: key
            };
        })
        .reverse();

    const challengeResponse = await client.fetch(query, { challenges });

    // Convert ChallengeList to object with id as key and title, difficulty, categories and slug as value
    const challengeList = challengeResponse.reduce((obj, item) => {
        obj[item._id] = {
            title: item.title,
            difficulty: item.difficulty,
            categories: item.categories.map((category) => category.name),
            slug: item.slug.current
        };
        return obj;
    }, {});

    if (!response)
        return (
            <div className="flex items-center justify-center my-auto h-96">
                <SpinnerCircular color="#26b4e3" />
            </div>
        );

    if (!response.ok) {
        return <div>No Data Available</div>;
    }

    if (response.ok) {
        return <SolutionList solutions={solutions} challengeList={challengeList}></SolutionList>;
    }
}
