import { BaseBoxShapeUtil, HTMLContainer, T, type RecordProps, type TLBaseShape } from 'tldraw'
import { PALETTE as P } from '../theme'

/**
 * The pit wall scene for the pitwall slides. A modern F1 car comes in fast,
 * brakes into its box under the pit wall, sits while the engineers radio it,
 * then launches out. Drawn in tldraw's hand-drawn style and animated with CSS
 * only, so the editor store is never touched per frame.
 */
export type PitSceneShape = TLBaseShape<'pitscene', { w: number; h: number }>

export class PitSceneUtil extends BaseBoxShapeUtil<PitSceneShape> {
  static override type = 'pitscene' as const
  static override props: RecordProps<PitSceneShape> = { w: T.number, h: T.number }

  override canResize = () => false
  override canEdit = () => false
  override hideSelectionBoundsFg = () => true
  override hideSelectionBoundsBg = () => true

  getDefaultProps(): PitSceneShape['props'] {
    return { w: 1000, h: 600 }
  }

  component(shape: PitSceneShape) {
    return (
      <HTMLContainer style={{ pointerEvents: 'none' }}>
        <PitScene w={shape.props.w} h={shape.props.h} />
      </HTMLContainer>
    )
  }

  indicator(shape: PitSceneShape) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }
}

/** f1-sprite.png: 8 frames of 639x160; shown at 560 wide. */
const SPRITE = { frames: 8, w: 560, h: (160 * 560) / 639, tyreBottom: (152 * 560) / 639 }

const INK = { stroke: P.ink, strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/*
 * One 7s cycle: arrive fast (0–30%), sit in the box (30–58%), launch (58–100%).
 * Car, wheels, speed lines and radio all share the same timeline.
 */
const css = `
.pw-car    { animation: pw-drive 7s infinite; }
.pw-sprite {
  width: 100%; height: 100%;
  background: url('f1-sprite.png') 0 0 / ${SPRITE.w * SPRITE.frames}px 100% repeat-x;
  animation: pw-frames 7s infinite;
}
.pw-speed { animation: pw-speed 7s infinite; }
.pw-wave  { animation: pw-wave 7s infinite; opacity: 0; }
.pw-wave.d2 { animation-delay: .25s; }
.pw-wave.d3 { animation-delay: .5s; }
.pw-trace { stroke-dasharray: 260; animation: pw-trace 2.4s linear infinite; }

@keyframes pw-drive {
  0%   { transform: translateX(-640px); animation-timing-function: cubic-bezier(.15,.7,.35,1); }
  30%  { transform: translateX(360px);  animation-timing-function: linear; }
  58%  { transform: translateX(360px);  animation-timing-function: cubic-bezier(.7,0,.95,.5); }
  100% { transform: translateX(1150px); }
}
/* wheel frames follow the car: fast in, slowing, still in the box, then away */
@keyframes pw-frames {
  0%   { background-position-x: 0;          animation-timing-function: steps(32, end); }
  15%  { background-position-x: -17920px; animation-timing-function: steps(12, end); }
  30%  { background-position-x: -24640px; }
  58%  { background-position-x: -24640px; animation-timing-function: steps(16, end); }
  75%  { background-position-x: -33600px; animation-timing-function: steps(48, end); }
  100% { background-position-x: -60480px; }
}
@keyframes pw-speed {
  0%, 18% { opacity: 1; }
  28%, 64% { opacity: 0; }
  76%, 100% { opacity: 1; }
}
@keyframes pw-wave {
  0%, 31% { opacity: 0; }
  35% { opacity: 1; } 40% { opacity: .15; }
  45% { opacity: 1; } 50% { opacity: .15; }
  54% { opacity: 1; } 58%, 100% { opacity: 0; }
}
@keyframes pw-trace { from { stroke-dashoffset: 260; } to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .pw-car, .pw-sprite, .pw-speed, .pw-wave, .pw-trace { animation: none; }
  .pw-car { transform: translateX(360px); }
  .pw-wave { opacity: 1; }
  .pw-speed { opacity: 0; }
}
`

function PitScene({ w, h }: { w: number; h: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 1000 600" style={{ overflow: 'hidden', display: 'block' }} aria-label="F1 car brakes into its pit box while engineers on the pit wall watch data and radio the driver, then it launches out">
      <style>{css}</style>

      {/* pit wall gantry */}
      <g {...INK} strokeWidth={5} fill="none">
        <path d="M548,48 C640,44 820,47 972,46" strokeWidth={7} />
        <path d="M566,50 C565,110 567,170 566,232" />
        <path d="M954,49 C955,110 953,170 955,232" />
        <path d="M530,232 C680,229 840,233 990,231 L990,262 C840,264 680,260 530,262 Z" fill={P.mutedTint} />
      </g>

      {/* telemetry screens */}
      <g {...INK} strokeWidth={5}>
        <path d="M690,82 L812,80 L814,148 L692,150 Z" fill={P.ink} />
        <path d="M832,80 L944,79 L946,148 L834,149 Z" fill={P.ink} />
      </g>
      <polyline className="pw-trace" points="702,134 724,120 744,126 764,104 784,112 802,96" fill="none" stroke={P.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline className="pw-trace" points="844,118 862,118 872,98 884,138 896,118 934,118" fill="none" stroke={P.mutedTint} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

      {/* two engineers with headsets */}
      <g {...INK} strokeWidth={5}>
        <path d="M586,232 C586,192 600,170 620,168 C642,170 654,192 654,232" fill={P.inkTint} />
        <circle cx="620" cy="138" r="24" fill={P.paper} />
        <path d="M596,136 C596,104 644,104 644,136" fill="none" stroke={P.accent} strokeWidth={7} />
        <path d="M596,134 L596,150 C604,160 612,162 618,160" fill="none" strokeWidth={4} />
      </g>
      <g {...INK} strokeWidth={5}>
        <path d="M672,232 C672,196 684,176 702,174 C722,176 734,196 734,232" fill={P.inkTint} />
        <circle cx="703" cy="146" r="22" fill={P.paper} />
        <path d="M681,144 C681,114 725,114 725,144" fill="none" stroke={P.accent} strokeWidth={7} />
      </g>

      {/* radio from the pit wall to the car while it sits in the box */}
      <g fill="none" stroke={P.accent} strokeWidth={6} strokeLinecap="round">
        <path className="pw-wave" d="M646,290 Q672,306 698,290" />
        <path className="pw-wave d2" d="M626,312 Q672,340 718,312" />
        <path className="pw-wave d3" d="M606,334 Q672,374 738,334" />
      </g>

      {/* track, with the pit box marked under the wall */}
      <path d="M0,506 C250,503 750,509 1000,505 L1000,600 L0,600 Z" fill={P.mutedTint} />
      <path d="M0,506 C250,503 750,509 1000,505" fill="none" stroke={P.ink} strokeWidth={6} strokeLinecap="round" />
      <path d="M0,509 C250,506 750,512 1000,508" fill="none" stroke={P.accent} strokeWidth={10} strokeDasharray="44 44" />
      <path d="M350,532 L920,532 M350,532 L350,580 M920,532 L920,580" fill="none" stroke={P.paper} strokeWidth={6} strokeLinecap="round" />
      <path d="M20,574 L120,574 M960,574 L1000,574" fill="none" stroke={P.paper} strokeWidth={6} strokeLinecap="round" />

      {/*
        The car is an 8-frame sprite (public/f1-sprite.png, one row, wheels
        turned 45 degrees per frame, transparent background). It rides in the
        same .pw-car group as the speed lines, so it shares the drive timeline.
        Shown 560 wide; the tyres touch the track line at y=506.
      */}
      <g className="pw-car">
        <g className="pw-speed" fill="none" stroke={P.muted} strokeWidth={5} strokeLinecap="round">
          <path d="M-18,424 L-100,424" />
          <path d="M-26,452 L-150,452" />
          <path d="M-14,480 L-90,480" />
        </g>
        <ellipse cx="290" cy="508" rx="270" ry="7" fill={P.ink} opacity={0.12} />
        <foreignObject x="0" y={506 - SPRITE.tyreBottom} width={SPRITE.w} height={SPRITE.h}>
          <div className="pw-sprite" />
        </foreignObject>
      </g>
    </svg>
  )
}
