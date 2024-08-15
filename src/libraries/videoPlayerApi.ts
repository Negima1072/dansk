export const initVideoPlayer = (
  mainContainer: HTMLDivElement,
  videoElement: HTMLVideoElement,
) => {
  const reactFiberProp = Object.keys(mainContainer).find((k) =>
    k.startsWith("__reactFiber"),
  ) as keyof HTMLDivElement;
  const playerOperation = (
    mainContainer[reactFiberProp] as unknown as ReactFiber
  )?.child?.child?.memoizedProps?.playerOperation as PlayerOperation;
  // for tmp make nvapi
  window.__videoplayer = {
    autoplay: () => videoElement.autoplay,
    buffered: () => videoElement.buffered,
    canPlayType: () => videoElement.canPlayType(""),
    clear: () => {},
    crossOrigin: (crossOrigin) => {
      if (crossOrigin) {
        videoElement.crossOrigin = crossOrigin;
      }
      return videoElement.crossOrigin as crossOriginType;
    },
    currentSrc: () => videoElement.currentSrc,
    currentTime: (currentTime) => {
      if (currentTime) {
        playerOperation.currentTime.set(currentTime);
      }
      return playerOperation.currentTime.get();
    },
    defaultPlaybackRate: () => videoElement.defaultPlaybackRate,
    duration: () => playerOperation.duration,
    element: () => videoElement,
    enableCurrentTimeSmoothing: false,
    ended: () => videoElement.ended,
    load: () => videoElement.load(),
    mirror: () => false,
    muted: (isMuted) => {
      if (isMuted !== undefined) {
        playerOperation.mute.set(isMuted);
      }
      return playerOperation.mute.isMuted;
    },
    originalCurrentTime: () => videoElement.currentTime,
    pause: () => playerOperation.playback.pause(),
    paused: () => !playerOperation.playback.isPlaying,
    play: () => playerOperation.playback.play(),
    playbackRate: (rate) => {
      if (rate) {
        videoElement.playbackRate = rate;
      }
      return videoElement.playbackRate;
    },
    playbackStalled: () => false,
    seeking: () => playerOperation.seek.isSeeking,
    src: () => videoElement.src,
    volume: (volume) => {
      if (volume) {
        playerOperation.volume.set(volume);
      }
      return playerOperation.volume.get();
    },
  };
};
