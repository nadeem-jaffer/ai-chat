export default function Error() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">
          There is some error. Please try again later.
        </p>
      </div>
    </div>
  );
}
