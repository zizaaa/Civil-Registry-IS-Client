import { Link } from "react-router-dom"

function NotFound() {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="p-5 rounded-md h-96 w-2/3 flex flex-col items-center justify-center">
                <h1 className="text-9xl font-bold text-darkCyan">404</h1>
                <h2 className="text-2xl font-medium text-gray-900 mb-5">Oops! Page not found</h2>
                <p className="font-medium text-lg mb-5">Oops! The page your are looking for does not exist. It might have been moved or deleted.</p>
                <Link to='/' className="bg-darkCyan px-5 py-2 rounded-md text-white drop-shadow-md">
                    Dashboard
                </Link>
            </div>
        </section>
    )
}

export default NotFound