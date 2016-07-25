import React from 'react';

/* 
TODO: VIDEO STREAM ARCHITECTURE
	- replace video tag with independant component or maybe pass down video stream as prop?
*/
class Video extends React.Component {
	constructor (props) {
		super(props);	
	}

	componentDidMount() {
    // Begin animating the video when it starts playing
    const video = document.querySelector('video');
    video.addEventListener('canplay', function(e) {
      video.className += ' video-reveal', 800;
      setTimeout(() => video.className = 'video', 2000);
    });
	}
	
	emitPlayAndListenForPause(e) {
		const video = e.target;
		this.props.socket.emit('play', video.currentTime);
		this.props.socket.on('pause', function(otherTime) {
			console.log('Recieved time: ',otherTime)
			if(video.currentTime !== otherTime) {
				video.currentTime = otherTime;
			}
			video.pause();
		});
	}

	emitPauseAndListenForPlay(e) {
		const video = e.target;
		this.props.socket.emit('pause', video.currentTime);
		this.props.socket.on('play', function(otherTime) {
			console.log('Recieved time: ',otherTime)
			if(video.currentTime !== otherTime) {
				video.currentTime = otherTime;
			}
			video.play();
		});
	}

	render() {
		return (
			<div className="video-container">
		    <div className="video-border"></div>
		    <video onPlay={ this.emitPlayAndListenForPause.bind(this) } onPause={ this.emitPauseAndListenForPlay.bind(this) } className="video" controls autoPlay>
		      <source src="" type="video/mp4"></source>
		    </video>
		    <div className="video-border"></div>
		  </div>
		)
	}
}

export default Video;