// Credential badge for the Claude Startup Program. Styled like a seal on a
// certificate: the program mark sits inside a ringed medallion, with a verified
// check and a small-caps "Certified" line beside the program name.
export default function CertificationBadge() {
  return (
    <div className="inline-flex items-center gap-4 rounded-2xl border border-[#d97757]/40 bg-gradient-to-br from-[#d97757]/15 via-white/[0.04] to-transparent backdrop-blur-sm pl-3 pr-6 py-3 text-left shadow-lg shadow-[#d97757]/10">
      <span className="relative shrink-0">
        {/* Outer certificate ring */}
        <span className="absolute -inset-1 rounded-full border border-dashed border-[#d97757]/60" aria-hidden="true"></span>
        <img
          src="/claude-startup-program.png"
          alt="Claude Startup Program logo"
          width="48"
          height="48"
          className="relative size-12 rounded-full ring-2 ring-[#f0d6c8]/70"
        />
        {/* Verified check */}
        <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#d97757] ring-2 ring-slate-950" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0b49a]">
          Certified member
        </span>
        <span className="text-base md:text-lg font-semibold text-white">Claude Startup Program</span>
      </span>
    </div>
  )
}
