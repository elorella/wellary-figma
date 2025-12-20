interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "main" | "icon"; // Added variant prop
}

export function Logo({ size = "md", showText = true, variant = "main" }: LogoProps) {
  // If variant is icon, override showText
  const displayText = variant === "icon" ? false : showText;
  
  // Size configurations
  const sizes = {
    sm: {
      width: displayText ? 80 : 24,
      height: displayText ? 24 : 24,
      viewBox: displayText ? "0 0 80 24" : "0 0 24 24",
      circleCx: displayText ? 10 : 12,
      circleCy: displayText ? 12 : 12,
      circleR: displayText ? 8 : 10,
      pathD: displayText 
        ? "M10 6 C10 6, 13 9, 13 12 C13 15, 10 18, 10 18 C10 18, 7 15, 7 12 C7 9, 10 6, 10 6"
        : "M12 7 C12 7, 15 10, 15 12 C15 14, 12 17, 12 17 C12 17, 9 14, 9 12 C9 10, 12 7, 12 7",
      textX: 22,
      textY: 16,
      fontSize: 14,
      gradientId: "wellary-gradient-sm",
    },
    md: {
      width: displayText ? 120 : 32,
      height: displayText ? 32 : 32,
      viewBox: displayText ? "0 0 120 32" : "0 0 32 32",
      circleCx: displayText ? 12 : 16,
      circleCy: displayText ? 16 : 16,
      circleR: displayText ? 10 : 13,
      pathD: displayText
        ? "M12 9 C12 9, 16 13, 16 16 C16 19, 12 23, 12 23 C12 23, 8 19, 8 16 C8 13, 12 9, 12 9"
        : "M16 9 C16 9, 21 14, 21 16 C21 18, 16 23, 16 23 C16 23, 11 18, 11 16 C11 14, 16 9, 16 9",
      textX: 28,
      textY: 21,
      fontSize: 18,
      gradientId: "wellary-gradient-md",
    },
    lg: {
      width: displayText ? 180 : 48,
      height: displayText ? 48 : 48,
      viewBox: displayText ? "0 0 180 48" : "0 0 48 48",
      circleCx: displayText ? 18 : 24,
      circleCy: displayText ? 24 : 24,
      circleR: displayText ? 15 : 20,
      pathD: displayText
        ? "M18 13 C18 13, 24 19, 24 24 C24 29, 18 35, 18 35 C18 35, 12 29, 12 24 C12 19, 18 13, 18 13"
        : "M24 13 C24 13, 32 21, 32 24 C32 27, 24 35, 24 35 C24 35, 16 27, 16 24 C16 21, 24 13, 24 13",
      textX: 42,
      textY: 32,
      fontSize: 27,
      gradientId: "wellary-gradient-lg",
    },
  };

  const config = sizes[size];

  return (
    <svg
      width={config.width}
      height={config.height}
      viewBox={config.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo icon - abstract wellness symbol */}
      <circle
        cx={config.circleCx}
        cy={config.circleCy}
        r={config.circleR}
        fill={`url(#${config.gradientId})`}
      />
      <path
        d={config.pathD}
        fill="white"
        fillOpacity="0.9"
      />

      {/* Text: Wellary */}
      {displayText && (
        <text
          x={config.textX}
          y={config.textY}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={config.fontSize}
          fontWeight="700"
          fill="#ffffff"
          letterSpacing="-0.5"
        >
          Wellary
        </text>
      )}

      <defs>
        <linearGradient
          id={config.gradientId}
          x1="2"
          y1="6"
          x2="22"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}