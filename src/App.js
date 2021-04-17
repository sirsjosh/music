import React,{useState,useRef} from 'react';

//import util
import data from './data';

//import styles
import './styles/app.scss';

//import components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {

  //state
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const [songInfo,setSongInfo]=useState({
    currentTime:0,
    duration:0,
    animationPercentage:0
})
const [libraryStatus,setLibraryStatus]=useState(false);

  //ref
  const audioRef=useRef(null);

  //handlers
  const timeUpdateHandler=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration;

    //calculate percentage
    const roundedCurrent=Math.round(current)
    const roundedDuration=Math.round(duration)

    const animationPercentage=Math.round((roundedCurrent/roundedDuration)*100);

    setSongInfo({...songInfo,currentTime:current ,duration,animationPercentage:animationPercentage});
}

const songEndHandler=async ()=>{
  const songIndex=songs.findIndex((song)=> song.id === currentSong.id)
  await setCurrentSong(songs[(songIndex+1)%songs.length]);
  if(isPlaying) audioRef.current.play();
}

  return (
    <div className={`App ${libraryStatus ? 'library-active':''}`}>
      <Nav currentSong={currentSong} songs={songs} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song isPlaying={isPlaying} currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
