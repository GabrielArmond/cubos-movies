export function LoadingSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="group rounded-lg shadow-md overflow-hidden w-full max-w-[183px] h-[281px] lg:w-60 lg:h-[355px] lg:max-w-[260px] lg:max-h-[360px] relative cursor-pointer hover:scale-105 transition-transform duration-200" />
        </div>
      ))}
    </div>
  );
}
