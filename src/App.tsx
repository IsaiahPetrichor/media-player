import { fs, dialog } from '@tauri-apps/api';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
	// hold paths to all videos
	const [videoArray, setVideoArray] = useState<string[]>([]);
	const [queue, setQueue] = useState(0);

	const [url, setUrl] = useState('');

	/* Main path should have all media, in subfolders. movies and tv should be one 
  folder deep unless there are multiple seasons, then each season should have a 
  sub folder as well. */

	// create a queue to hold current and next video

	// on video end, start next video

	// load previous directory on launch

	const selectDirectory = () => {
		// select a new directory to open
		dialog.open({ defaultPath: 'C:/', directory: true }).then((path) => {
			if (typeof path === 'string') {
				fs.readDir(path).then((files) => {
					setVideoArray(files.map((path) => path.path));
					setQueue(0);
				});
			}
		});
	};

	useEffect(() => {
		if (videoArray.length > 0) setUrl(convertFileSrc(videoArray[queue]));
	}, [queue, videoArray]);

	return (
		<main>
			<button onClick={selectDirectory}>Open folder</button>
			{url && url !== '' && (
				<video
					controls
					src={url}
					onEnded={() => setQueue(queue + 1)}
					autoPlay></video>
			)}
			<p>Current Video: {videoArray[queue]}</p>
			<p>Next: {videoArray[queue + 1]}</p>
			<button onClick={() => setQueue(queue - 1)}>Last</button>
			<button onClick={() => setQueue(queue + 1)}>Next</button>
		</main>
	);
}

export default App;
