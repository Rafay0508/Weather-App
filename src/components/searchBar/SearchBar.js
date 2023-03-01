
import { useRef } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
// import MainBody from '../mainBody/MainBody';
import './searchBar.css';

function SearchBar(props) {
    const count = useRef(null);

    function onSubmitHandler(e) {
        e.preventDefault();
        if (count.current.value === '') {
            const city = 'karachi';
            props.onCitySelect(city);
        }
        else{
        const city = count.current.value;
        props.onCitySelect(city);   
    }
       
    }

    return (
        <div className="SearchBar">
            <div className='search'>
                <form onSubmit={onSubmitHandler}>
                    <input type={Text} placeholder="Enter City Name Here" name='city' className='inputBar'
                        ref={count}
                    />
                    <button>< BiSearchAlt /> </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;
