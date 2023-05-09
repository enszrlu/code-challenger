import React from 'react';
import Link from 'next/link';

import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

function StudioNavbar(props) {
    return (
        <div>
            <div>
                <Link href="/" className="text-primary flex items-center p-4 gap-5">
                    <ArrowUturnLeftIcon className="h-6 w-6 fill-primary" />
                    Go To Website
                </Link>
            </div>
            <>{props.renderDefault(props)}</>
        </div>
    );
}

export default StudioNavbar;
