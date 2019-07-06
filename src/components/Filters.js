import React from 'react';

import TextField from './TextField';

// Component for the filters for Cities and Weather Type
const Filters = () => {
  return (
    <div className="filters">
      <TextField name='Search' />
    </div>
  );
};

export default Filters;
