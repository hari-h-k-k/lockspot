import {useState} from 'react';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import './Search.css'

function SearchBar({setLocation}) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        sessionStorage.setItem('location', JSON.stringify(searchQuery))
        setLocation(searchQuery)
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div id="searchbar_id">
            <InputGroup id="searchbar">
                <Input
                    placeholder="Location"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <InputRightElement
                    pointerEvents="auto"
                    onClick={handleSearch}
                    style={{cursor: 'pointer'}}
                >
                    <SearchIcon color="gray.300"/>
                </InputRightElement>
            </InputGroup>
        </div>
    );
}

export default SearchBar;
