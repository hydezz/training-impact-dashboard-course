/** Simple self-designed circular seal for "Training Impact by Claude" (TIC). */
export default function TicSeal({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Logo Training Impact by Claude (TIC)"
    >
      <defs>
        <path id="tic-circle-text" d="M 60,60 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0" />
      </defs>

      {/* outer double ring */}
      <circle cx="60" cy="60" r="58" fill="#ffffff" stroke="#16293f" strokeWidth="3" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#b45309" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="31" fill="#16293f" />

      {/* circular text */}
      <text fill="#16293f" fontSize="8.6" fontWeight="700" letterSpacing="1.6">
        <textPath href="#tic-circle-text" startOffset="0%">
          TRAINING IMPACT BY CLAUDE • CERTIFIED •
        </textPath>
      </text>

      {/* rising-bars motif (training impact) */}
      <g fill="#b45309">
        <rect x="46" y="66" width="6" height="9" rx="1" />
        <rect x="56" y="60" width="6" height="15" rx="1" />
        <rect x="66" y="53" width="6" height="22" rx="1" />
      </g>

      {/* monogram */}
      <text
        x="60"
        y="52"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="19"
        fontWeight="800"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="1"
      >
        TIC
      </text>
    </svg>
  );
}
