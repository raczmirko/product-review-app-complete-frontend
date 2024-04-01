import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ text, color, textColor }) => {
  const headerStyle = {
    backgroundColor: color,
    color: textColor,
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="page-header" style={headerStyle}>
      {text}
    </div>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default PageHeader;
