/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

export default (props) => {
  const { loading } = props;
  return (
    <>
      {loading && <h4 className="mainapp-loading">loading1...</h4>}
    </>
  )
}