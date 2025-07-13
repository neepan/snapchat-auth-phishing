import snapchatSvg from "../../Snapchat-Ghost-Outlined-Logo.wine.svg";

export const SnapchatGhost = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <div className={className}>
      <img 
        src={snapchatSvg} 
        alt="Snapchat Ghost Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};