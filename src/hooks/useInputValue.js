import React, {useState} from 'react';

function useInputValue(defaultValue ="") {
  const [value, setValue] = useState(defaultValue);
  
  return {
    bind: {
      value,
      onChange: e => setValue(e.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

export default useInputValue;