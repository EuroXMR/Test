"""Generates the Saint & Saint Studio company stamp (SVG) in two variants."""
from pathlib import Path

INK = "#1c2c6b"
SERIF = "'Cormorant Garamond', Didot, 'Bodoni 72', 'Times New Roman', 'Liberation Serif', serif"

def diamond(cx, cy, s):
    return f'<path d="M{cx},{cy-s} L{cx+s*0.6},{cy} L{cx},{cy+s} L{cx-s*0.6},{cy} Z"/>'

def meander(x, y):
    """One meander tile (100x100 units): a ∩ stroke interlocked with its 180° rotation."""
    a = "M9,100 V9 H51 A14,14 0 0 1 65,23 V69"
    return (f'<g transform="translate({x} {y})" fill="none" stroke-width="18" stroke-linejoin="miter">'
            f'<path d="{a}"/><path d="{a}" transform="rotate(180 50 50)"/></g>')

def dot_tile(x, y):
    return (f'<g transform="translate({x} {y})"><rect x="2.5" y="2.5" width="95" height="95" fill="none" stroke-width="5"/>'
            f'<circle cx="50" cy="50" r="31" stroke="none"/></g>')

def logo(cx, top, size):
    """Company logo: 2x2 grid of meander / circle tiles."""
    k = size / 203.5
    return (f'<g transform="translate({cx - size / 2} {top}) scale({k:.4f})">'
            f'{meander(0, 0)}{dot_tile(103.5, 0)}{dot_tile(0, 103.5)}{meander(103.5, 103.5)}</g>')

def stamp(director: bool) -> str:
    if director:
        centre = f'''
    <line x1="318" y1="612" x2="682" y2="612" stroke-width="3"/>
    <text x="500" y="666" font-size="40" letter-spacing="6" text-anchor="middle" stroke="none">SANTIAGO PUIG</text>
    <text x="500" y="708" font-size="26" letter-spacing="10" text-anchor="middle" stroke="none">DIRECTOR</text>'''
    else:
        centre = f'''
    <line x1="318" y1="612" x2="682" y2="612" stroke-width="3"/>
    <text x="500" y="668" font-size="28" letter-spacing="8" text-anchor="middle" stroke="none">LUXURY RESIDENCES</text>
    <g stroke="none">{diamond(500, 712, 10)}</g>'''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <path id="top" d="M500,870 A370,370 0 1,1 500,130 A370,370 0 1,1 500,870"/>
    <path id="bottom" d="M500,85 A415,415 0 1,0 500,915 A415,415 0 1,0 500,85"/>
    <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="rough"/>
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
    {logo(500, 318, 262)}{centre}
  </g>
</svg>
'''

out = Path(__file__).parent
(out / "saint-saint-studio-stamp.svg").write_text(stamp(False))
(out / "saint-saint-studio-stamp-director.svg").write_text(stamp(True))
