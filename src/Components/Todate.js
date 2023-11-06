import React from 'react';

const Today = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed (0-11)
  const day = today.getDate();

  // Formatting to get "YYYY-MM-DD"
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  return (
    formattedDate
  );
};

export default Today;
