interface RatingCircleProps {
  rating: number;
  size?: 'default' | 'small';
}

export const RatingCircle = ({
  rating,
  size = 'default',
}: RatingCircleProps) => {
  const circleSize = size === 'default' ? 140 : 98;
  const strokeWidth = size === 'default' ? 10 : 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rating / 100) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center w-[${circleSize}px] h-[${circleSize}px]`}
    >
      <svg
        width={circleSize}
        height={circleSize}
        className="absolute"
        viewBox={`0 0 ${circleSize} ${circleSize}`}
      >
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="#12111380"
          stroke="rgba(255, 255, 255, 0.27)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="transparent"
          stroke="#FFE000"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`absolute font-montserrat font-semibold ${
          size === 'default' ? 'text-[24px]' : 'text-[20px]'
        } text-yellow-400`}
      >
        {rating.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        })}
        <span
          className={`text-[#211f26] dark:text-[#eeeef0] ${size === 'default' ? 'text-[14.4px]' : 'text-[12px]'}`}
        >
          %
        </span>
      </span>
    </div>
  );
};
