import { Spinner } from 'flowbite-react';

function LoaderSm() {
    return (
        <div className="flex flex-wrap gap-2">
            <Spinner aria-label="Spinner" size="sm"/>
        </div>
    );
}

export default LoaderSm