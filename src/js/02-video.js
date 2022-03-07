import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const CURRENT_TIME = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay (data) {
    
    localStorage.setItem(CURRENT_TIME, data.seconds);

};

const currentTime = localStorage.getItem(CURRENT_TIME);

player.setCurrentTime(currentTime).then(function (seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});





// const idPlayer = new Player('vimeo-player',options);

// const onPlay = function(data) {
//     console.log(data);
// };

// idPlayer.on('playing', onPlay);












