import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';

const Nav=({libraryStatus,setLibraryStatus,currentSong})=> {
    return (
        <nav style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]}`}}>
            <h1>Waves</h1>
            <button onClick={()=>setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
            
        </nav>
    )
}

export default Nav
