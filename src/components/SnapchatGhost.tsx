export const SnapchatGhost = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M50 10c-15 0-25 10-25 25v20c0 8 3 15 8 20l-5 8c-1 2 0 4 2 4h40c2 0 3-2 2-4l-5-8c5-5 8-12 8-20V35c0-15-10-25-25-25z"/>
        <circle cx="42" cy="40" r="3" fill="black"/>
        <circle cx="58" cy="40" r="3" fill="black"/>
        <path d="M45 50c2-2 8-2 10 0" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
};