function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600 animate-pulse">Loading...</p>
            </div>
        </div>
    )
}

export default Loading