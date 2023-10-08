import { useState } from 'react';

const useInputs = (initialState) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return [inputs, handleInputChange];
};

export default useInputs;
