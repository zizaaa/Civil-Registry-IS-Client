import { Spinner } from "flowbite-react";

function LoaderDefault() {
    return (
        <div className="flex flex-wrap gap-2">
            <Spinner color="info" aria-label="Spinner" />
        </div>
    );
}

export default LoaderDefault;