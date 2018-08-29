import * as React from 'react';
import * as Radium from 'radium';

const Color = require('color');

function HSL(hue, saturation, lightness, alpha?)
{
  let col = Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  if (alpha !== undefined)
  {
    col = col.alpha(alpha);
  }
  return col;
}

export class Test extends React.Component<{}, {}>
{

  public renderFont(objFont, keys)
  {
    return Object.keys(objFont).map((k, i) => 
      {
        if (keys.indexOf(k) !== -1)
        {
          const value = objFont[k].string();
          return (
            <div
              key={i} style={{
                color: value,
              }}
            >
              Hello there
            </div>
          );
        }
      });
  }

  public renderBgs(bgObj, objFont, bgKeys, fontKeys)
  {
    return Object.keys(bgObj).map((k, i) => 
      {
        if (bgKeys.indexOf(k) !== -1)
        {
          const value = bgObj[k].string();
          return (
            <div
              key={i} style={{
                backgroundColor: value,
                width: '100px', height: '100px',
              }}
            >
              {this.renderFont(objFont, fontKeys)}
            </div>
          );
        }
        
        
      });
  }

  public render()
  {
    return (
      <div style={{display: 'flex', padding: '30px', flexWrap: 'wrap'}}>
        {this.renderBgs(Styles.bg, Styles.font, ['L1', 'L2', 'L3'], ['D1', 'D2', 'D3'])}
        {this.renderBgs(Styles.bg, Styles.font, ['D1', 'D2', 'D3'], ['L1', 'L2', 'L3'])}
      </div>
    );
  }
}

export const Styles =
{
  bg:
  {
    L1: HSL(190, 5, 98),
    L2: HSL(190, 5, 94),
    L3: HSL(190, 5, 80),
    D1: HSL(0, 0, 18),
    D2: HSL(0, 0, 30),
    D3: HSL(0, 0, 40),
  },
  veil: {
    neutral: HSL(0, 0, 50, 0.2),
    shadow: HSL(0, 0, 0.2, 0.4),
    shadowL: HSL(0, 0, 0.2, 0.1),
  },
  font:
  {
    L1: HSL(0, 0, 100),
    L2: HSL(0, 0, 90, 0.9),
    L3: HSL(0, 0, 80, 0.7),
    D1: HSL(0, 0, 0),
    D2: HSL(0, 0, 20, 0.8),
    D3: HSL(0, 0, 40, 0.6),
  },
  color:
  {
    primary1: HSL(185, 80, 50),
    primary2: HSL(185, 70, 80),
    active: HSL(185, 65, 50),
    activeHover: HSL(185, 65, 50, 0.7),
    green: HSL(130, 55, 50),
    greenHover: HSL(130, 65, 50, 0.7),
    error: HSL(0, 100, 75),
  }
  
}
