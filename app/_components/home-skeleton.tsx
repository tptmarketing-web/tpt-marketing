'use client';

function Shimmer({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header placeholder */}
      <div className="h-16 flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Shimmer className="h-11 w-11 rounded-full" />
          <Shimmer className="h-6 w-32" />
        </div>
        <div className="hidden md:flex gap-3">
          <Shimmer className="h-8 w-16" />
          <Shimmer className="h-8 w-16" />
          <Shimmer className="h-8 w-16" />
        </div>
      </div>

      {/* Hero placeholder */}
      <div className="pt-16 pb-12 bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <Shimmer className="h-12 w-3/4 mb-4" />
          <Shimmer className="h-12 w-2/3 mb-6" />
          <Shimmer className="h-5 w-full max-w-xl mb-2" />
          <Shimmer className="h-5 w-4/5 max-w-lg mb-8" />
          <div className="flex gap-3">
            <Shimmer className="h-14 w-48 rounded-2xl" />
            <Shimmer className="h-14 w-40 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Products placeholder */}
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <Shimmer className="h-9 w-64 mb-3" />
          <Shimmer className="h-5 w-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <Shimmer className="aspect-[4/3] rounded-none" />
              <div className="p-5 space-y-3">
                <Shimmer className="h-5 w-3/4" />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-5/6" />
                <div className="flex justify-between pt-3">
                  <Shimmer className="h-6 w-16" />
                  <Shimmer className="h-9 w-24 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
