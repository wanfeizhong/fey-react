/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

export default function TableScroll(props) {
  const {colums, showHeader, dataSource, headerBGC, oddRowBGC, evenRowBGC, rowHeight, headerHeight, headerColor} = props;
  const defaultRowHeight = 40;
  const defaultOddRowBGC = '#003B51';
  const defaultEvenRowBGC = 'transparent';
  const waitTime = props.waitTime || 2000;
  const showNum = props.showNum || 5;
  const [isAnimate, setIsAnimate] = useState(false);
  const [rows, setRows] = useState([]);
  const [childHeight, setChildHeight] = useState(0);
  const [contHeight, setContHeight] = useState(0);
  const intervalRef = useRef(0);
  const tableRef = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeoutFun();
    }
  }, []);
  useEffect(() => {
    init();
  }, [dataSource]);
  function clearTimeoutFun () {
    const intervalId = intervalRef.current;
    clearTimeout(intervalId);
  }
  function init() {
    clearTimeoutFun();
    setTimeout(() => {
      let data = [];
      if((dataSource.length > showNum) && (dataSource.length%2===1)) {
        // 列表长度为奇数且大于显示条数则处理成偶数
        data = [...dataSource, ...dataSource].map(item => {
          return {...item};
        });
      } else {
        data = dataSource.map(item => {
          return {...item};
        })
      }
      const list = data.map((item, index) => {
        const row = {...item};
        row.background = (index%2 === 1) ? (oddRowBGC || defaultOddRowBGC) : (evenRowBGC || defaultEvenRowBGC);
        return row;
      });
      const domRef = tableRef.current;
      // console.log('domRef---------', domRef);
      const childHeight = domRef.firstElementChild ? (domRef.firstElementChild || domRef.firstChild).offsetHeight : (rowHeight || defaultRowHeight);
      const contHeight = (childHeight) * showNum;
      setContHeight(contHeight);
      setChildHeight(childHeight);
      setRows(list);
      scroll(list)
    })
  }
 
  function scroll(data) {
    intervalRef.current = setTimeout(()=>{
      if (showNum < data.length) {
        const list = data.map(item => ({...item}));
        setIsAnimate(true);
        setTimeout(() => {
          const row = list.shift();
          list.push(row);
          setIsAnimate(false);
          setRows(list);
        }, 300);
        scroll(list);
      }
    }, waitTime)
  }
  function columStyle(colum) {
    const length = colums.length;
    const style = {textAlign: colum.align || 'left'}
    if (colum.width) {
      style.width = colum.width;
    } else {
      style.width = `${100/length}%`;
    }
    return style
  }
  return <>
    <div>
      {
        showHeader ? <div style={{
          display: 'flex',
          background: headerBGC || 'transparent',
          height: `${headerHeight || rowHeight || defaultRowHeight}px`,
          alignItems: 'center',
          color: headerColor || '#fff',
          justifyContent: 'space-between'
        }}>
          {colums.map((colum) => {
                    return <div key={colum.key} span={8} style={columStyle(colum)}>{colum.title}</div>
                  })}
        </div> : ''
      }
      <div style={{height: `${contHeight}px`, overflow: 'hidden', transition: 'all 0.5s'}}>
        <div
          ref={tableRef}
          style={{transition: isAnimate ? 'all 0.5s' : '', marginTop: isAnimate ? `-${childHeight}px` : '0px'}}
        >
          {(rows).map((row, index) => {
            return <div key={index}>
              <div style={{
                background: row.background || 'transparent',
                color: row.color || '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                height: `${rowHeight || defaultRowHeight}px`,
                lineHeight: `${rowHeight || defaultRowHeight}px`,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                {colums.map((colum) => {
                  const render = colum.render;
                  return <div key={colum.key} style={columStyle(colum)}>
                    {(typeof render === 'function') ? render(row, index) : row[colum.key]}
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  </>
}

TableScroll.propTypes = {
  dataSource: propTypes.array, // 表格数据
  colums: propTypes.array, // 表头
  showHeader: propTypes.bool, // 是否显示表头
  headerBGC: propTypes.string, // 表头背景色
  oddRowBGC: propTypes.string, // 奇数行背景色
  evenRowBGC: propTypes.string, // 偶数行背景色
  headerColor: propTypes.string, // 表头字体颜色
  headerHeight: propTypes.number, // 表头高度，数字类型
  rowHeight: propTypes.number, // 行高，数字类型
  waitTime: propTypes.number, // 间隔时间
  showNum: propTypes.number, // 表格内容区显示行数
}

