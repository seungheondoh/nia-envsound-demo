import React, {useState,useEffect,useReducer,useRef} from "react";
import {Togglediv,SliderContainer,Sliderdiv} from "../../styles";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";

export default function Player( props ) {
	const [loaded, setLoaded ] = useState(false) ; //Whether file is loaded
	const [playing,setPlaying] = useState(false) ; //Whether audio is playing
	const [soundBuffer,setSoundBuffer] = useState(null) ; //The current buffer containing audio data. Soundtouch expects hardcoded 'buffer'
	const [source,setSource] = useState(null) ; //The current Audio Source mapped to the buffer data
	const [audioContext, setAudioContext] = useState() ; //Current Audio Context

	//Audio properties
	const [pitch,setPitch] = useState(0) ; //Pitch
	const [offset,setOffset] = useState(0) ; //Offset from where to play. 0 = start
	const [duration,setDuration] = useState(0) ; //Total duration of the sound clip
	const [startedAt,setStartedAt] = useState(0) ; //AudioContext's current time when playback started
	const [timerId, setTimerId] = useState(0) ; //To track the javascript setInterval
	const [tick,setTick] = useState(0) ; //A numeric variable to increase, so that useEffect is called on every timer tick
	const [sliderValue,setSliderValue] = useState(0) ; //Slider's current value

	//DOM references
	const playPauseRef = useRef(null) ;
	const sliderRef = useRef(null) ;
	const positionRef = useRef(null) ;

	const loadSound = (name,success,err) => {
		var request = new XMLHttpRequest();
		request.open('GET', name )
			request.responseType = 'arraybuffer'
			request.onload = function() {
				const ac = new AudioContext() ; //Create Audio Context
				setAudioContext(ac) ; //Save audio context to React
				ac.decodeAudioData(request.response, function(buffer) {
					setSoundBuffer( buffer ) ; //Save buffer contents in React
					var duration = parseInt(buffer.duration) ;
					setDuration(duration) ; //Save total duration in React
					sliderRef.current.setAttribute('max',duration) ; //Change slider's max value depending on sound duration
					playPauseRef.current.disabled = false ;
					setLoaded(true) ; //Indicate to React that file is loaded
				}, err || function(msg) {console.error(msg)});
			}
		request.send(); 
	}

	const showPosition = () => {
		var cur ;
		if ( playing ) {
			cur = parseInt(offset+audioContext.currentTime-startedAt) ; 
		} else {
			cur = parseInt(offset) ;
		}
		setSliderValue(cur) ; 
	} ;

	useEffect( () => {
		setSliderValue(0);
		setOffset(0);
		loadSound(props.src);
	},[props.src]) ;

	useEffect( ()=>{
		showPosition() ;
	}, [offset,duration,tick]) ;

	const onPlayPause = (ev) => {
		if ( ! loaded )
			return ;
		if ( playing )
			dispatch("stop") ;
		else
			dispatch("start") ;
	} ;
	const onSliderChanged = (ev) => {
		if ( playing ) {
			dispatch("stop") ;
			setOffset(parseInt(ev.target.value)) ; //Change offset
			setTimeout( ()=>{ dispatch("start") ;}, 0) ; //Start after a 100ms delay
		}
	} ;

	//Play sound
	const startPlay = () => {
		if ( ! loaded ) //Make sure file is loaded
			return ;
		if ( playing ) //Avoid playing again if already playing
			return ;
		
		var bs = audioContext.createBufferSource() ; //Create source from audio context
		bs.buffer = soundBuffer ; //Attach file buffer to it
		setSource(bs) ; //Save it to React
		bs.detune.value = pitch ; //Ability to change pitch of sound by click of button
		bs.connect(audioContext.destination);
		audioContext.resume() ; //Resume audio context which was paused earlier
		bs.onended = (ev) => { //If sound clip reaches the end, stop audio context via dispatch
			dispatch("stop") ;
		} ;
		bs.start(0,offset) ; //Start playing sound from given offset
		setStartedAt( audioContext.currentTime ) ; //Preserve the starting value of audio context time counter
		setPlaying(true) ;
		setTimerId(setInterval( ()=>{setTick(new Date().getTime());}, 1000 ) ) ; //Start a 1 second timer to refresh the UI position
	}

	//Stop playing sound
	const stopPlay = () => {
		if ( ! playing )
			return ;
		setPlaying(false) ;
		var cur 
		cur = offset + parseInt(audioContext.currentTime-startedAt)  ; 
		setOffset( cur ) ; //Preserve offset if required to play from same place again
		clearInterval( timerId ) ; //Clear the Javascript timer
		source.onended = null ; //Remove listener attached to 'ended'
		source.stop() ; //Stop the sound source
		audioContext.suspend() ; //Suspend audio source
	}

	const [state, dispatch] = useReducer( (state,action)=> {
		switch(action) {
			case 'start' :
				startPlay() ;
				return 'started' ;
			default :
				stopPlay() ;
				return 'stopped' ;
		}
	},"stopped") ;

	return(
		<>
			<SliderContainer className='player'>
				<Togglediv ref={playPauseRef} onClick={onPlayPause}>
					{playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
				</Togglediv>
				<div ref={positionRef}> </div>
				<Sliderdiv ref={sliderRef} type="range" min="0" max="100" className="slider" value={sliderValue} onChange={onSliderChanged} backgroundColor={props.backgroundColor}/>
			</SliderContainer>
		</>
	) ;
}