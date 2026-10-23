import { Soul } from '@/components/Soul'
import { sfx } from '@/lib/sound'

type DownloadButtonProps = {
  href: string
  size?: string // optional, e.g. "120 MB"
}

// 9x8 pixel-art desktop monitor, same grid style as the Soul icon.
function PixelMonitor({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 8"
      className={`inline-block shrink-0 ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* screen frame */}
      <path fill="currentColor" fillRule="evenodd" d="M0 0h9v6H0zM1 1h7v4H1z" />
      {/* stand and base */}
      <path fill="currentColor" d="M4 6h1v1H4zM2 7h5v1H2z" />
    </svg>
  )
}

// Download button + "Windows only" note, matching the Use / Inspect code buttons.
export function DownloadButton({ href, size }: DownloadButtonProps) {
  return (
    <span className="flex flex-wrap items-center gap-3">
      <a
        href={href}
        rel="noopener noreferrer"
        onClick={() => sfx.select()}
        className="ut-button px-4 py-3 text-[0.65rem]"
      >
        <Soul className="h-3 w-3" /> Download
      </a>
      <span className="flex items-center gap-2 text-lg text-ut-gray">
        <PixelMonitor className="h-4 w-4" />
        Windows only
        {size && <span className="text-white/50">· {size}</span>}
      </span>
    </span>
  )
}
