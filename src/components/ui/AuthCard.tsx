export const AuthCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center max-w-sm min-w-72 w-full p-5 rounded-sm bg-[var(--card)] shadow-sm">
      <div className="w-full">{children}</div>
    </div>
  );
};
