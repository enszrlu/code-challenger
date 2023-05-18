'use client';

import { usePreview } from '../../../lib/sanity.preview';
import ChallengeList from '../ChallengeList';

function PreviewChallenges({ query }) {
    const challenges = usePreview(null, query);
    console.log('inside preview mode');

    return <ChallengeList challenges={challenges}></ChallengeList>;
}

export default PreviewChallenges;
