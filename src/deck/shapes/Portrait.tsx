import { useState } from 'react'
import { BaseBoxShapeUtil, HTMLContainer, T, type RecordProps, type TLBaseShape } from 'tldraw'
import { PALETTE as P } from '../theme'

/**
 * A photo pinned to the board with a hand-drawn frame. The image is read from
 * /public (for example public/lauren-tan.jpg). If the file is missing, the
 * frame shows the person's initials instead of a broken image.
 */
export type PortraitShape = TLBaseShape<'portrait', { w: number; h: number; src: string; initials: string }>

export class PortraitUtil extends BaseBoxShapeUtil<PortraitShape> {
  static override type = 'portrait' as const
  static override props: RecordProps<PortraitShape> = { w: T.number, h: T.number, src: T.string, initials: T.string }

  override canResize = () => false
  override canEdit = () => false

  getDefaultProps(): PortraitShape['props'] {
    return { w: 320, h: 380, src: '', initials: '' }
  }

  component(shape: PortraitShape) {
    return (
      <HTMLContainer style={{ pointerEvents: 'none' }}>
        <Portrait {...shape.props} />
      </HTMLContainer>
    )
  }

  indicator(shape: PortraitShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={18} />
  }
}

function Portrait({ w, h, src, initials }: PortraitShape['props']) {
  const [failed, setFailed] = useState(false)
  const inset = 14
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <div
        style={{
          position: 'absolute',
          inset,
          borderRadius: 12,
          overflow: 'hidden',
          background: P.mutedTint,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {!failed && src ? (
          <img src={src} alt="" onError={() => setFailed(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <span style={{ fontSize: 96, fontWeight: 700, color: P.muted }}>{initials}</span>
        )}
      </div>
      {/* hand-drawn frame, slightly uneven like a tldraw draw-style rectangle */}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }} aria-hidden="true">
        <path
          d={`M10,14 C${w * 0.3},8 ${w * 0.7},12 ${w - 10},9 C${w - 6},${h * 0.3} ${w - 9},${h * 0.7} ${w - 11},${h - 10} C${w * 0.7},${h - 6} ${w * 0.3},${h - 9} 12,${h - 12} C8,${h * 0.7} 11,${h * 0.3} 10,14 Z`}
          fill="none"
          stroke={P.ink}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
