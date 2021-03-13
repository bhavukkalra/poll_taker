import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';


const Homepage = () => {
    return(
        <div>
        <ErrorMessage />
        <Polls />
        </div>
    )
};

export default Homepage;