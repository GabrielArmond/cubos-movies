interface Props {
  progress: number;
}

export const CardLoading = ({ progress }: Props) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden w-full relative flex items-center justify-center">
      <div className="absolute w-24 h-24 lg:w-32 lg:h-32 rounded-full backdrop-blur-xs" />
      <div className="relative z-10">
        <svg
          className="w-24 h-24 lg:w-32 lg:h-32 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.27)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FFE000"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#FFE000] text-xl lg:text-2xl font-bold lg:font-semibold">
            {Math.round(progress)}
            <span className="text-white font-bold lg:font-semibold text-xs lg:text-sm">
              %
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
