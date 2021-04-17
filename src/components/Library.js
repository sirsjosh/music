import React from 'react';
import LibrarySong from './LibrarySong';

const Library=({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}) =>{
    return (
        <div>
           
            <div className={`library  ${libraryStatus ? 'active-library ':''}`}>
            <h2>Library</h2>
                 {songs.map((song)=> (
                 <LibrarySong setSongs={setSongs} songs={songs} isPlaying={isPlaying} audioRef={audioRef} key={song.id}  song={song} setCurrentSong={setCurrentSong}/>))}  
            </div>
        </div>
    )
}

export default Library
