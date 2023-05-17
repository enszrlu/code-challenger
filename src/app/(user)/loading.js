import React from 'react';
import { SpinnerCircular } from 'spinners-react';

function loading() {
    return (
        <div className="flex items-center justify-center my-auto h-96">
            <SpinnerCircular color="#26b4e3" />
        </div>
    );
}

export default loading;
