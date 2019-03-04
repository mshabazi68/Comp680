import React, { Component } from 'react';
import SearchField from "react-search-field";
import './searchField.css'

class SearchBarComp extends Component {
    render() { 
        return (
            <SearchField
            placeholder="Search..."
            classNames="field"
            />
        );
    }
}
 
export default SearchBarComp;

// https://www.npmjs.com/package/react-search-field