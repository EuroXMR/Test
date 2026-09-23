"""Generates the Saint & Saint Studio company stamp (SVG) in two variants."""
from pathlib import Path

INK = "#1c2c6b"
SERIF = "'Cormorant Garamond', Didot, 'Bodoni 72', 'Times New Roman', 'Liberation Serif', serif"

def diamond(cx, cy, s):
    return f'<path d="M{cx},{cy-s} L{cx+s*0.6},{cy} L{cx},{cy+s} L{cx-s*0.6},{cy} Z"/>'

def stamp(director: bool) -> str:
    if director:
        centre = f'''
    <line x1="318" y1="590" x2="682" y2="590" stroke-width="3"/>
    <text x="500" y="648" font-size="40" letter-spacing="6" text-anchor="middle" stroke="none">SANTIAGO PUIG</text>
    <text x="500" y="694" font-size="26" letter-spacing="10" text-anchor="middle" stroke="none">DIRECTOR</text>'''
    else:
        centre = f'''
    <line x1="318" y1="590" x2="682" y2="590" stroke-width="3"/>
    <text x="500" y="652" font-size="28" letter-spacing="8" text-anchor="middle" stroke="none">LUXURY RESIDENCES</text>
    <g stroke="none">{diamond(500, 698, 10)}</g>'''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <path id="top" d="M500,870 A370,370 0 1,1 500,130 A370,370 0 1,1 500,870"/>
    <path id="bottom" d="M500,85 A415,415 0 1,0 500,915 A415,415 0 1,0 500,85"/>
    <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="grain"/>
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.05" result="grainMask"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="21" result="press"/>
      <feColorMatrix in="press" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.5 0 0 0 1.55" result="pressMask"/>
      <feComposite in="rough" in2="grainMask" operator="in" result="grained"/>
      <feComposite in="grained" in2="pressMask" operator="in"/>
    </filter>
  </defs>
  <g filter="url(#ink)" transform="rotate(-4 500 500)" fill="{INK}" stroke="{INK}" font-family="{SERIF}" font-weight="600" opacity="0.93">
    <g fill="none">
      <circle cx="500" cy="500" r="476" stroke-width="13"/>
      <circle cx="500" cy="500" r="454" stroke-width="3"/>
      <circle cx="500" cy="500" r="336" stroke-width="3"/>
      <circle cx="500" cy="500" r="324" stroke-width="1.5"/>
    </g>
    <text font-size="62" letter-spacing="12" text-anchor="middle" stroke="none"><textPath href="#top" startOffset="50%">SAINT &amp; SAINT STUDIO</textPath></text>
    <text font-size="44" letter-spacing="7" text-anchor="middle" stroke="none"><textPath href="#bottom" startOffset="50%">PROPERTY DEVELOPMENT · CYPRUS</textPath></text>
    <g stroke="none">{diamond(105, 500, 16)}{diamond(895, 500, 16)}</g>
    <g stroke="none">{diamond(440, 360, 8)}{diamond(500, 352, 13)}{diamond(560, 360, 8)}</g>
    <text x="500" y="548" font-size="196" font-style="italic" text-anchor="middle" stroke="none">S&amp;S</text>{centre}
  </g>
</svg>
'''

out = Path(__file__).parent
(out / "saint-saint-studio-stamp.svg").write_text(stamp(False))
(out / "saint-saint-studio-stamp-director.svg").write_text(stamp(True))
