




import { useContext, useEffect, useState, useRef } from 'react';
import '../App.css';

import { userDataContext } from '../context/usercontext';
import prev from '../images/previous.png';
import next from '../images/fast-forward.png';
import pause from '../images/play.png';
import circle from '../images/replay.png';
import logolist from '../images/playlist.png';
import logo from '../images/DQBBAtuUEAIcZuL.jpg';
import useAudio from '../hooks/useAudio';
import MusicList from './music-list';
import ALL_MUSIC from '../utils/musics_functions';

import { GetData, LoadDataList } from '../utils/firebase';




function MainBody() {
    const { userData, setUserData } = useContext(userDataContext);

    const handlePlayPause = () => {
        toggle()
    }

    const handleNext = (flag, cycle) => {


        let index = musicIdx;


        if (!flag || (flag && !cycle)) {
            if (musicIdx == ALL_MUSIC.length - 1) {
                index = 0;
            }
            else {
                index = musicIdx + 1;
            }
            let found = true;

            while (found) {
                for (let i = 0; i < compositionsindex.length; i++) {
                    if (compositionsindex[i] - 1 == index) {
                        found = false;
                        setMusicIdx(index);
                    }
                }
                if (found) {
                    if (index == ALL_MUSIC.length - 1) {
                        index = 0;
                    }
                    else {
                        index++;
                    }
                }
            }
        }


        if (flag) {
            const playingCopy = playing
            toggle()
            playAfterSet(true)
            if (!cycle)
                setUrl(ALL_MUSIC[index].url)
            setTimeout(() => {
                if (playingCopy)
                    shouldSwitch(true);
                handlePlayPause()
            }, 1000)
            return
        }

        if (!playing) {
            setUrl(ALL_MUSIC[index].url)
        } else {
            toggle()
            playAfterSet(true)
            setUrl(ALL_MUSIC[index].url)
        }
    }

    const handlePrev = () => {


        let index = musicIdx;
        if (musicIdx == 0) {
            index = ALL_MUSIC.length - 1;
        }
        else {
            index = musicIdx - 1;
        }

        let found = true;

        while (found) {
            for (let i = 0; i < compositionsindex.length; i++) {
                if (compositionsindex[i] - 1 == index) {
                    found = false;
                    setMusicIdx(index);
                }
            }
            if (found) {

                if (index == 0) {
                    index = ALL_MUSIC.length - 1;
                }
                else {
                    index--;
                }
            }
        }

        if (!playing) {
            setUrl(ALL_MUSIC[index].url)
        } else {
            toggle()
            playAfterSet(true)
            setUrl(ALL_MUSIC[index].url)
        }

    }


    const [playing, toggle, setUrl, playAfterSet, toggleCycle, shouldCycle] = useAudio('', handleNext);

    const [showList, setShowList] = useState(false);

    const [compositionsindex, setCompositionsindex] = useState([1, 2, 3, 4])

    const [liststatus, setliststatus] = useState(false);



    useEffect(() => {
        setMusicData(ALL_MUSIC[musicIdx] || null);
    }, [musicIdx]);

    useEffect(() => {
        setUrl(musicData?.url || '')
    }, [musicData]);

    const handlechange = () => {

        if (liststatus == false) {
            GetData().then((result) => {
                let t = JSON.parse(result);
                let k = []
                for (let i = 0; i < t.length; i++) {
                    k.push(t[i].index)
                };
                setCompositionsindex(k);
                setliststatus(true);

            });
        }
        else {
            setliststatus(false);
            setCompositionsindex([1, 2, 3, 4]);
        }
    }

    const handlelike = () => {

        GetData().then((result) => {

            let t = JSON.parse(result);
            let found = false;


            for (let i = 0; i < t.length; i++) {
                if (t[i].index == musicIdx + 1) {
                    found = true;
                }
            }


            let k = []
            if (found == false) {
                let p = musicIdx + 1;
                t.push({ index: p });
                LoadDataList(t);
            }
            else {
                for (let i = 0; i < t.length; i++) {
                    if (t[i].index - 1 != musicIdx) {
                        k.push({ index: t[i].index });
                    }
                }
                LoadDataList(k);
            }


        });
    }



    const handleListItemClick = (id) => {

        const newIdx = ALL_MUSIC.findIndex((data) => data.id == id)
        if (newIdx != -1) {
            setShowList(false);
            setMusicIdx(newIdx)
            if (!playing) {
                playAfterSet(true)
                setUrl(ALL_MUSIC[newIdx].url)
            } else {
                toggle()
                playAfterSet(true)
                setUrl(ALL_MUSIC[newIdx].url)
            }
        }
    };

    useEffect(() => console.log('shouldCycle', shouldCycle), [shouldCycle]);

    return (
        <>
            <div className="top-bar">
                <i id="more-s" className="material-icons" onClick={() => setShowList(true)}>
                    List
                </i>
                {showList &&
                    (
                        <MusicList
                            listIds={compositionsindex}
                            onClick={handleListItemClick}
                            onClose={() => setShowList(false)}
                        />
                    )
                }


                <span>Now Playing</span>
                <button type="button" id="likedislike" className="listc" onClick={handlelike}>Like</button>
                <button type="button" id="changelist" className="listc" onClick={handlechange}>Choose user list</button>
            </div>
            <div className="img-area">
                <img src={logo} alt="" />
            </div>
            <div className="song-details">
                <p className="name">{musicData?.name || 'Not defined'}</p>
                <p className="artist">{musicData?.artist || 'Not defined'}</p>
            </div>
            <div className="controlss">

                <button type="button" id="prev" className="material-icons prev musiccontrlole" onClick={handlePrev}>Prev</button>

                <button type="button" id="pause" className="material-icons play musiccontrlole" onClick={handlePlayPause}>Pause</button>

                <button type="button" id="next" className="material-icons next musiccontrlole" onClick={() => handleNext(false, shouldCycle)}>Next</button>

                <button type="button" id="repeat-plist" className="material-icons repeat musiccontrlole" title="Playlist looped" onClick={toggleCycle}>Circle</button>
            </div>



        </>
    );
}

export default MainBody;
