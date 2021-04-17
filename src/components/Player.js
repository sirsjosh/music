import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons'

const Player=({setSongs,setCurrentSong,currentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs})=> {

    //state
 

  

    //event handlers
    const playSongHandler=()=>{
        if(isPlaying){
           
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        
    }

    const activeLibraryHandler=(nextPrev)=>{
         //add active state
       const newSongs=songs.map(song=>{

        if(song.id===nextPrev.id){
            return{
                ...song,
                active:true
            }
        }else{
            return{
                ...song,
                active:false
            }
        }
            
        })

        setSongs(newSongs);
    }

    const skipTrackHandler=async (direction)=>{
        const songIndex=songs.findIndex((song)=> song.id === currentSong.id)

        if(direction==='skip-forward'){
            await setCurrentSong(songs[(songIndex+1)%songs.length]);
            activeLibraryHandler(songs[(songIndex+1)%songs.length]);
          
        }if(direction==='skip-back'){
            if((songIndex-1)%songs.length===-1){
                await setCurrentSong(songs[songs.length-1]);
                activeLibraryHandler(songs[songs.length-1]);
                if(isPlaying) audioRef.current.play();  
                return;
            }
            await setCurrentSong(songs[(songIndex-1)%songs.length]);
            activeLibraryHandler(songs[(songIndex-1)%songs.length]);
        }
        if(isPlaying) audioRef.current.play();
    }

    const dragHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value});
    }

    const getTime=(time)=>{
        return(
            Math.floor(time/60)+':'+('0'+Math.floor(time%60)).slice(-2)
        )
    }

    //add styles
    const trackAnim={
        transform:`translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                    <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                        <input min={0} max={songInfo.duration || 0.00} onChange={dragHandler} value={songInfo.currentTime} type='range'/>
                        <div style={trackAnim} className="animate-track"></div>
                     </div>
                <p>{getTime(songInfo.duration || 0.00)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className='skip-back' size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size="2x"  icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} className='skip-forward' size="2x"  icon={faAngleRight}/>
            </div>
            
        </div>
    )
}

export default Player
