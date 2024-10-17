/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Component } from 'react';

const defaultRowHeight = 40;
const defaultOddRowBGC = '#003B51';
const defaultEvenRowBGC = 'transparent';
export default class RollingDynamic extends Component {
  constructor(props) {
    super();
    this.domRef = null;
    this.timer = null;
    this.childHeight = null;
    const dataSource = props.dataSource;
    this.state = {
      isAnimate: false,
      contHeight: props.contHeight || 0,
      showNum: props.showNum || 5,
      waitTime: props.waitTime || 3000,
      rows: (dataSource.length%2===1 && dataSource.length > props.showNum) ? [...dataSource, ...dataSource] : [...dataSource],
    }
  }
  componentDidMount() {
    this.init();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  init = () => {
    clearInterval(this.timer);
    const { showNum, waitTime, rows } = this.state;
    const { oddRowBGC, evenRowBGC, rowHeight } = this.props;
    setTimeout(() => {
      const list = rows.map((item, index) => {
        const row = {...item};
        row.background = (index%2 === 1) ? (oddRowBGC || defaultOddRowBGC) : (evenRowBGC || defaultEvenRowBGC);
        return row;
      });
      const domRef = this.domRef;
      this.childHeight = (domRef.firstElementChild || domRef.firstChild)?.offsetHeight || (rowHeight || defaultRowHeight);
      const contHeight = (this.childHeight) * showNum;
      this.setState({
        contHeight,
        rows: list,
      }, () => {
        this.timer = setInterval(this.scroll, waitTime);
      });
    })
  }
  scroll = () => {
    console.log('scroll-----');
    const { showNum } = this.props;
    const { rows } = this.state;
    if (showNum < rows.length) {
      const list = [...rows];
      this.setState({
        isAnimate: true
      });
      setTimeout(() => {
        const row = list.shift();
        list.push(row);
        this.setState({
          isAnimate: false,
          rows: list,
        });
      }, 300);
    }
  }
 render(){
  const { contHeight, isAnimate, rows } = this.state;
  const { colums, showHeader, headerBGC, rowHeight, headerHeight } = this.props;
  const childHeight = this.childHeight
   return (
      <div>
        {
          showHeader ? <div style={{
            display: 'flex',
            background: headerBGC || 'transparent',
            height: `${headerHeight || rowHeight || defaultRowHeight}px`,
            alignItems: 'center'
          }}>
            {colums.map((colum) => {
              return <div key={colum.key} span={8} style={{width: colum.width || `${100/colums.length}%`}}>{colum.title}</div>
            })}
          </div> : ''
        }
        <div style={{height: `${contHeight}px`, overflow: 'hidden', transition: 'all 0.5s'}}>
          <div
            ref={(ref) => {this.domRef = ref;}}
            style={{transition: isAnimate ? 'all 0.5s' : '', marginTop: isAnimate ? `-${childHeight}px` : '0px'}}
          >
            {this.props.children ? this.props.children : (rows).map((row, index) => {
              return <div key={index}>
                <div style={{
                  background: row.background || 'transparent',
                  fontSize: '14px',
                  fontWeight: 700,
                  height: `${rowHeight || defaultRowHeight}px`,
                  lineHeight: `${rowHeight || defaultRowHeight}px`,
                  display: 'flex'
                }}>
                  {colums.map((colum) => {
                    const render = colum.render;
                    return <div
                      key={colum.key}
                      span={8}
                      style={{width: colum.width || `${100/colums.length}%`, color: colum.color || '#ffffff',}}>
                        {(typeof render === 'function') ? render(row, index) : row[colum.key]}
                    </div>
                  })}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
   )
 }
}
