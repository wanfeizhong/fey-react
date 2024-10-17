/* eslint-disable no-unused-vars */
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";


import Demo from '@/pages/demo'
function RoutesData(props) {
  console.log('RoutesData-----props----------', props)
  return (
    <>
    <HashRouter>
      {/* <div> */}
        <Routes>
          <Route path="/" element={<Navigate to="/demo" />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>
      {/* </div> */}
    </HashRouter>
    </>
  );
}

export default RoutesData;
