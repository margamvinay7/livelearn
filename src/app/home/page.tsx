export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to LMS</h1>
      <p className="mb-4">Your gateway to learning and teaching.</p>
      <a href="/courses" className="bg-blue-600 text-white px-4 py-2 rounded">View Courses</a>
      <a href="/signin" className="mt-2 text-blue-600 underline">Sign In</a>
    </div>
  );
} 