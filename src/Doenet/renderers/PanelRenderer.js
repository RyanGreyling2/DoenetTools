import React from 'react';
import BaseRenderer from './BaseRenderer';
// import { reduce } from 'bluebird';
// import { Z_BLOCK } from 'zlib';

class PanelRender extends BaseRenderer {
  constructor({ key, breakpoints }) {
    super({ key: key });

    this.breakpoints = breakpoints;

  }

  //   updateWindowDimensions(){
  //       console.log(window.innerWidth);

  //   }

  jsxCode() {
    super.jsxCode();

    //   window.addEventListener('resize', this.updateWindowDimensions);
    //   console.log(window.innerWidth);

    let itemStyle = {
      // margin: "5px",
    };

    if (this.breakpoints.length === 0) {
      itemStyle['margin'] = "5px"; //10px gaps on flex
    }

    let childDoenetTags = this.renderedChildren.map(x => <span style={itemStyle} key={`${x.key}item`}>{x}</span>)


    // if (this.breakpoints.length === 0) {
      //columns not defined
    let panelStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }
      return <React.Fragment>
  
        <span style={panelStyle}  _key={this._key} >{childDoenetTags}</span>

      </React.Fragment>
    // }

    // let mediaQueries = {}
    // for (let [index, obj] of this.breakpoints.entries()) {

    //   let columns = obj.arrayOfWidths.join('px ') + 'px';
    //   let breakPointWithOffset = obj.breakpoint + 10 + 10 * (obj.possibleColumnNumbers + 1);
    //   if (index === 0) { breakPointWithOffset = 0; }
    //   mediaQueries[`(min-width: ${breakPointWithOffset}px)`] = {};
    //   mediaQueries[`(min-width: ${breakPointWithOffset}px)`][".container"] =
    //     {
    //       display: 'grid',
    //       gridTemplateColumns: columns,
    //       gridColumnGap: "10px",
    //       gridRowGap: "10px",
    //       width: `${obj.breakpoint}px`,
    //     }
    //   mediaQueries[`(min-width: ${breakPointWithOffset}px)`][`.container${this._key}`] =
    //     {
    //       display: 'grid',
    //       gridTemplateColumns: columns,
    //       gridColumnGap: "10px",
    //       gridRowGap: "10px",
    //       width: `${obj.breakpoint}px`,
    //     }
    // }

    // // console.log(mediaQueries);


    // const panelStyle = { mediaQueries: mediaQueries };


    // return <React.Fragment>
    //   <a name={this._key} />
    //   <Style rules={panelStyle} />
    //   <span className={`container${this._key}`} _key={this._key} >{childDoenetTags}</span>
    // </React.Fragment>

  }

}

let AvailableRenderers = {
  panel: PanelRender,
}

export default AvailableRenderers;