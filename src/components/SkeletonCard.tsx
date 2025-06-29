const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-4">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    </div>
  );
};

export default SkeletonCard;
// This component can be used to display a loading state for article cards.
