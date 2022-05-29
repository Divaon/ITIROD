import React, { useMemo } from 'react';
import '../App.css';
import ALL_MUSIC from '../utils/musics_functions';

const MusicList = ({listIds, onClick, onClose}) => {
    const filteredList = useMemo(
        () => ALL_MUSIC.filter((data) => listIds.includes(data.id)),
        [listIds]
    );
    return (
        <div className="music-list show">
            <div className="header">
            <div className="row">
                <i className= "list material-icons">List</i>
            </div>
            <i id="close" className="material-icons" onClick={() => onClose()}>Close</i>
            </div>
            <ul>
                {filteredList.map((songData) => (
                    <li key={songData.id} onClick={() => onClick(songData.id)}>
                        <div className="row">
                            <span>{songData.name}</span>
                            <p>{songData.artist}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MusicList;
