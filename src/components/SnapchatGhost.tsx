import snapchatLogo from "@/assets/snapchat-logo.png";

export const SnapchatGhost = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <div className={className}>
      <img 
        src={snapchatLogo} 
        alt="Snapchat Ghost Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};