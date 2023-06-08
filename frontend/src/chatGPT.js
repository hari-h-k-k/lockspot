import { useState } from 'react';
import { Select, Button } from '@chakra-ui/react';

function DropdownExample() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedValues(selectedOptions);
  };

  const handleSubmit = () => {
    console.log(selectedValues);
  };

  return (
    <div style={{ height: '200px' }}>
      <Select
        multiple
        placeholder="Select options"
        onChange={handleSelectChange}
        value={selectedValues}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>
      <Button mt={4} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default DropdownExample;
