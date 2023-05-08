'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function UserPanel() {
    const router = useRouter();
    let session = false;

    return session ? (
        <div>{/* TO BE IMPLEMENTED AFTER AUTH */}</div>
    ) : (
        <div>
            {/* Login Button */}
            <button
                onClick={() => router.push('/login')}
                className="bg-gradient-to-tr from-primary to-secondary hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded "
            >
                Login
            </button>
        </div>
    );
}

export default UserPanel;
