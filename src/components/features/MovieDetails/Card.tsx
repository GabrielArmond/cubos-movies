interface Props {
  title: string;
  content: string | number;
  textSize?: 'text-sm' | 'text-base' | 'text-lg';
  contentFontWeight?: 'font-normal' | 'font-medium' | 'font-bold';
  width?: string;
}

export const Card = ({
  title,
  content,
  textSize = 'text-base',
  contentFontWeight = 'font-normal',
  width = 'w-full',
}: Props) => {
  return (
    <div
      className={`p-4 bg-gradient-to-r from-[#232225] to-[#23222599] rounded-sm flex flex-col items-start justify-center gap-2 ${width}`}
    >
      <h1
        className={`montserrat ${textSize} font-bold text-[var(--dialog-title)] uppercase`}
      >
        {title}
      </h1>
      <p
        className={`montserrat text-left ${textSize} ${contentFontWeight} text-[var(--foreground)]`}
      >
        {content}
      </p>
    </div>
  );
};
