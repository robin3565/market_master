import { useState } from 'react';

function useCheckbox(initialState) {
  const [checkboxes, setCheckboxes] = useState(initialState);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCheckAllChange = (event) => {
    const { checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      check_all: checked,
      terms: checked,
      privacy: checked,
      subscribe: checked,
    }));
  };

  return [checkboxes, handleCheckboxChange, handleCheckAllChange];
}

export default useCheckbox;
