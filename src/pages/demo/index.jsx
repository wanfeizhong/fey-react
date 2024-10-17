/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef } from 'react';
import TableScroll from '@/components/tableScroll';
function Demo(){
  const [rows, setRows] = useState([]);
  const dataSource = [
    {
        "colum1": "295320241780",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "523759.00000",
    },
    {
        "colum1": "295320241780",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "523759.00000",
    },
    {
        "colum1": "295320241771",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "347949.00000",
    },
    {
        "colum1": "295320241771",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "347949.00",
    },
    {
        "colum1": "295320241776",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "534225.00000",
    },
    {
        "colum1": "295320241776",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "534225.00000",
    },
    {
        "colum1": "295320241776",
        "colum2": "609",
        "colum3": "colum3",
        "colum4": "534225.00000",
    }
  ];
  useEffect(() => {
    setRows(dataSource.map((item, index) => {
      item.colum2 = `row${index}`;
      return item; 
    }));
    setTimeout(() => {
      const dataSource1 = dataSource.map(item => ({...item}));
      const dataSource2 = dataSource.map(item => ({...item}));
      setRows([...dataSource1, ...dataSource2].map((item, index) => {
        item.colum2 = `${index}`;
        return item; 
      }));
    }, 6000)
    return () => {
    }
  }, []);
  return <>
    <div style={{background: '#000', height: '100vh'}}>
      <div style={{textAlign: 'center', width: '800px', padding: '30px'}}>
        <TableScroll
          showNum={5}
          showHeader={true}
          dataSource={rows}
          headerBGC='#00BAFF'
          oddRowBGC='#003B51'
          evenRowBGC='#0A2732'
          rowHeight={40}
          headerHeight={40}
          waitTime={2000}
          colums={[
            {key: 'colum1', title: 'colum1', width: '', align: 'center',},
            {key: 'colum2', title: 'colum2', width: '100px'},
            {key: 'colum3', title: 'colum3', width: ''},
            {key: 'colum4', title: 'colum4', width: '', render: (record, index) => {
              return <div style={{color: '#f00'}}>{record.colum4}</div>
            }},
          ]}
        />
      </div>
    </div>
  </>
}
export default Demo
