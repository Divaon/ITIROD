import React, { useState, useEffect } from "react";

const useAudio = (startUrl, handleEnded) => {
    const [url, setUrl] = useState(startUrl)
    const [audio, setAudio] = useState(new Audio(startUrl));

    const [shouldCycle, setShouldCycle] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [_playAfterSet, playAfterSet] = useState(false);

    const toggleCycle = () => setShouldCycle(!shouldCycle)
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        setAudio(new Audio(url));
        if (_playAfterSet) {
            playAfterSet(false);
            toggle()
        }
    }, [url])

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    const handleEndedCallback = () => {
        if (shouldCycle) {
            audio.currentTime = 0
            audio.play()
        }
        handleEnded(true, shouldCycle);
    }

    useEffect(() => {
        audio.addEventListener('ended', handleEndedCallback);
        return () => {
            audio.removeEventListener('ended', handleEndedCallback);
        };
    }, [audio, shouldCycle]);

    return [playing, toggle, setUrl, playAfterSet, toggleCycle, shouldCycle];
};

export default useAudio;
