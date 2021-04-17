import React from 'react';


const LibrarySong=({song,setCurrentSong,audioRef,isPlaying,songs,setSongs})=> {

    const {cover,name,artist}=song;

    //handlers
    const songSelectHandler=async ()=>{
        await setCurrentSong(song);
        //add active state
       const newSongs=songs.map(sng=>{

        if(sng.id===song.id){
            return{
                ...sng,
                active:true
            }
        }else{
            return{
                ...sng,
                active:false
            }
        }
            
        })

        setSongs(newSongs);
       
        //check is song is playing 
       if(isPlaying) audioRef.current.play();
        
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected':''}`}>
            <img alt={song.name} src={cover}></img>
            <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
            </div>   
        </div>
    )
}

export default LibrarySong
