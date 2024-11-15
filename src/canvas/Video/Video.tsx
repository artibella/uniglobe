import { FC, useCallback, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { VideoProps } from '.';
import { PlayButton } from './PlayButton';
import { getMediaUrl } from '../../utilities';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const ASPECT_RATION_PADDING = '56.25%';

export const Video: FC<VideoProps> = ({
  url,
  videoAsset,
  loop,
  controls,
  lazyLoad = false,
  placeholderImage,
  muted,
}) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const onPlay = useCallback(() => setPlaying(true), []);

  const onPause = useCallback(() => setPlaying(false), []);

  const videoUrl = url ? url.path : getMediaUrl(videoAsset);
  return (
    <div className="border-2 border-white group/video relative">
      {videoUrl && (
        <div style={{ paddingBottom: ASPECT_RATION_PADDING }}>
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            onPause={onPause}
            onPlay={onPlay}
            width="100%"
            height="100%"
            controls={controls}
            muted={muted}
            loop={loop}
            style={{ position: 'absolute', left: 0, top: 0 }}
            light={(lazyLoad && getMediaUrl(placeholderImage)) || lazyLoad}
            playIcon={<PlayButton onClick={onPlay} />}
          />
        </div>
      )}
    </div>
  );
};
