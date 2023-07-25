import React, { useRef, useState, useEffect } from 'react'
import './AudioController.css'
import { Slider, Switch } from 'antd';
import { Button } from 'antd'
import test1_01 from '../../../../../Assets/Test01_01.mp3'
import { PauseFill, CaretRightFill, VolumeDownFill } from 'react-bootstrap-icons';

function AudioController({ AudioTest, currentQuestionIndex }) {
  const audioRef = useRef(new Audio(AudioTest[0].audioSrc))
  const audio = audioRef.current
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTimeAudio, setTotalTimeAudio] = useState('0:00')
  const [currentTimeAudio, setcurrentTimeAudio] = useState('0:00')
  const [isHovered, setIsHovered] = useState(false);
  const HandleChangeSecondsToHMS = (time) => {
    const totalSeconds = time;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audio) {
        const time = HandleChangeSecondsToHMS(audio.currentTime)
        setcurrentTimeAudio(time);
      }
    }
    const intervalId = setInterval(updateCurrentTime, 1000);

    audio.addEventListener('loadedmetadata', () => {
      const time = HandleChangeSecondsToHMS(audio.duration)
      setTotalTimeAudio(time);
    });
    return () => {
      clearInterval(intervalId);
    };
  }, [])
  const onChange = (value) => {
    if (isPlaying) {
      setIsPlaying(false)
    }
    audio.currentTime = value;
    const time = HandleChangeSecondsToHMS(value);
    setcurrentTimeAudio(time);
  };

  const formatter = (value) => HandleChangeSecondsToHMS(value);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audio.src = AudioTest[currentQuestionIndex].audioSrc
    setIsPlaying(false)
  }, [currentQuestionIndex])

  const handleSliderDragEnd = (value) => {
    setIsPlaying(true)
  };
  return (
    <div className='navbar-audio-question'>
      <audio controls>
        <source  src={test1_01}></source>
      </audio>
      {/* {isPlaying ? (
        <Button className='btn-audio' shape="circle" onClick={() => setIsPlaying(false)}>
          <PauseFill className='icon' />
        </Button>
      ) :
        (
          <Button className='btn-audio' shape="circle" onClick={() => setIsPlaying(true)}>
            <CaretRightFill className='icon' />
          </Button>
        )}

      <div className='current-time-audio'>
        {currentTimeAudio} / {totalTimeAudio}
      </div>
      <div className={` ${!isHovered ? 'slider-radio' : 'slider-radio-small'}`}>
        <Slider
          min={0}
          max={audioRef.current.duration}
          step={0.1}
          value={audio.currentTime}
          tooltip={{ formatter, }}
          onChange={onChange}
          onAfterChange={handleSliderDragEnd}
        />
      </div>
      <div className='volume-audio'
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => setIsHovered(false)}>
        <Slider defaultValue={100} className={`${isHovered ? 'slider-volumn-hover' : 'slider-volumn-small'}`} />
      </div>
      <Button className='btn-audio' shape="circle"
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => setIsHovered(false)}>
        <VolumeDownFill fontSize={28} />
      </Button> */}
    </div>
  )
}

export default AudioController