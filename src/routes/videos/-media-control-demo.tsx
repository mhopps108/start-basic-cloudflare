// biome-ignore lint/style/useImportType:
import {
  Button,
  Checkbox,
  Group,
  Progress,
  Slider,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import React, { useState, useRef, useCallback } from "react";
// import screenfull from 'screenfull';

// import { version } from '../../../package.json';
import ReactPlayer from "react-player";
import { TVideo } from "~/utils/types";
// import Duration from './Duration';

export const MediaControl = ({ video }: { video: TVideo }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const urlInputRef = useRef<HTMLInputElement | null>(null);

  const initialState = {
    // src: undefined,
    src: video.src.includes("http")
      ? video.src
      : `${import.meta.env.VITE_ASSET_URL}/${video.src}`,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
    loadedSeconds: 0,
    playedSeconds: 0,
  };

  type PlayerState = Omit<typeof initialState, "src"> & {
    src?: string;
  };

  const [state, setState] = useState<PlayerState>(initialState);

  const load = (src?: string) => {
    setState((prevState) => ({
      ...prevState,
      src,
      played: 0,
      loaded: 0,
      pip: false,
    }));
  };

  const handlePlayPause = () => {
    setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const handleStop = () => {
    setState((prevState) => ({ ...prevState, src: undefined, playing: false }));
  };

  const handleToggleControls = () => {
    setState((prevState) => ({ ...prevState, controls: !prevState.controls }));
  };

  const handleToggleLight = () => {
    setState((prevState) => ({ ...prevState, light: !prevState.light }));
  };

  const handleToggleLoop = () => {
    setState((prevState) => ({ ...prevState, loop: !prevState.loop }));
  };

  const handleVolumeChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const inputTarget = event.target as HTMLInputElement;
    setState((prevState) => ({
      ...prevState,
      volume: Number.parseFloat(inputTarget.value),
    }));
  };

  const handleToggleMuted = () => {
    setState((prevState) => ({ ...prevState, muted: !prevState.muted }));
  };

  const handleSetPlaybackRate = (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => {
    const buttonTarget = event.target as HTMLButtonElement;
    setState((prevState) => ({
      ...prevState,
      playbackRate: Number.parseFloat(`${buttonTarget.dataset.value}`),
    }));
  };

  const handleRateChange = () => {
    const player = playerRef.current;
    if (!player) return;

    setState((prevState) => ({
      ...prevState,
      playbackRate: player.playbackRate,
    }));
  };

  const handleTogglePIP = () => {
    setState((prevState) => ({ ...prevState, pip: !prevState.pip }));
  };

  const handlePlay = () => {
    console.log("onPlay");
    setState((prevState) => ({ ...prevState, playing: true }));
  };

  const handleEnterPictureInPicture = () => {
    console.log("onEnterPictureInPicture");
    setState((prevState) => ({ ...prevState, pip: true }));
  };

  const handleLeavePictureInPicture = () => {
    console.log("onLeavePictureInPicture");
    setState((prevState) => ({ ...prevState, pip: false }));
  };

  const handlePause = () => {
    console.log("onPause");
    setState((prevState) => ({ ...prevState, playing: false }));
  };

  const handleSeekMouseDown = () => {
    setState((prevState) => ({ ...prevState, seeking: true }));
  };

  const handleSeekChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;
    setState((prevState) => ({
      ...prevState,
      played: Number.parseFloat(inputTarget.value),
    }));
  };
  //   const handleSeekChange = (value: number) => {
  //     // const inputTarget = event.target as HTMLInputElement;
  //     setState((prevState) => ({
  //       ...prevState,
  //       //   played: Number.parseFloat(value),
  //       played: value,
  //     }));
  //   };

  const handleSeekMouseUp = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;
    setState((prevState) => ({ ...prevState, seeking: false }));
    if (playerRef.current) {
      playerRef.current.currentTime =
        Number.parseFloat(inputTarget.value) * playerRef.current.duration;
    }
  };
  //   const handleSeekMouseUp = (value: number) => {
  //     // const inputTarget = event.target as HTMLInputElement;
  //     setState((prevState) => ({ ...prevState, seeking: false }));
  //     if (playerRef.current) {
  //       //   playerRef.current.currentTime =
  //       //     Number.parseFloat(inputTarget.value) * playerRef.current.duration;
  //       playerRef.current.currentTime = value * playerRef.current.duration;
  //     }
  //   };

  const handleProgress = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking || !player.buffered?.length) return;

    console.log("onProgress");

    setState((prevState) => ({
      ...prevState,
      loadedSeconds: player.buffered?.end(player.buffered?.length - 1),
      loaded:
        player.buffered?.end(player.buffered?.length - 1) / player.duration,
    }));
  };

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    // We only want to update time slider if we are not currently seeking
    if (!player || state.seeking) return;

    console.log("onTimeUpdate", player.currentTime);

    if (!player.duration) return;

    setState((prevState) => ({
      ...prevState,
      playedSeconds: player.currentTime,
      played: player.currentTime / player.duration,
    }));
  };

  const handleEnded = () => {
    console.log("onEnded");
    setState((prevState) => ({ ...prevState, playing: prevState.loop }));
  };

  const handleDurationChange = () => {
    const player = playerRef.current;
    if (!player) return;

    console.log("onDurationChange", player.duration);
    setState((prevState) => ({ ...prevState, duration: player.duration }));
  };

  //   const handleClickFullscreen = () => {
  //     const reactPlayer = document.querySelector('.react-player');
  //     if (reactPlayer) screenfull.request(reactPlayer);
  //   };

  const renderLoadButton = (src: string, label: string) => {
    return (
      <button type="button" onClick={() => load(src)}>
        {label}
      </button>
    );
  };

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    playerRef.current = player;
    console.log(player);
  }, []);

  const handleLoadCustomUrl = () => {
    if (urlInputRef.current?.value) {
      setState((prevState) => ({
        ...prevState,
        src: urlInputRef.current?.value,
      }));
    }
  };

  const {
    src,
    playing,
    controls,
    light,
    volume,
    muted,
    loop,
    played,
    loaded,
    duration,
    playbackRate,
    pip,
  } = state;

  const SEPARATOR = " · ";

  const btnVariant = "default";

  return (
    <Stack>
      <ReactPlayer
        ref={setPlayerRef}
        className="react-player"
        style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
        src={src}
        pip={pip}
        playing={playing}
        controls={controls}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        config={{
          youtube: {
            color: "white",
          },
          vimeo: {
            color: "ffffff",
          },
          spotify: {
            preferVideo: true,
          },
          tiktok: {
            fullscreen_button: true,
            progress_bar: true,
            play_button: true,
            volume_control: true,
            timestamp: false,
            music_info: false,
            description: false,
            rel: false,
            native_context_menu: true,
            closed_caption: false,
          },
        }}
        onLoadStart={() => console.log("onLoadStart")}
        onReady={() => console.log("onReady")}
        onStart={(e) => console.log("onStart", e)}
        onPlay={handlePlay}
        onEnterPictureInPicture={handleEnterPictureInPicture}
        onLeavePictureInPicture={handleLeavePictureInPicture}
        onPause={handlePause}
        onRateChange={handleRateChange}
        onSeeking={(e) => console.log("onSeeking", e)}
        onSeeked={(e) => console.log("onSeeked", e)}
        onEnded={handleEnded}
        onError={(e) => console.log("onError", e)}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onDurationChange={handleDurationChange}
      />

      <Stack>
        <Title order={4}>Controls</Title>
        <Group>
          <Button variant={btnVariant} onClick={handleStop}>
            Stop
          </Button>
          <Button variant={btnVariant} onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </Button>
          {/* <button type="button" onClick={handleClickFullscreen}> */}
          <Button
            variant={btnVariant}
            onClick={() => console.log("full screen needs some work")}
          >
            Fullscreen
          </Button>
          {src && ReactPlayer.canEnablePIP?.(src) && (
            <Button variant={btnVariant} onClick={handleTogglePIP}>
              {pip ? "Disable PiP" : "Enable PiP"}
            </Button>
          )}
        </Group>
      </Stack>

      <Stack>
        <Title order={4}>Speed</Title>

        <Group>
          <Button
            variant={btnVariant}
            onClick={handleSetPlaybackRate}
            data-value={1}
          >
            1x
          </Button>
          <Button
            variant={btnVariant}
            onClick={handleSetPlaybackRate}
            data-value={1.5}
          >
            1.5x
          </Button>
          <Button
            variant={btnVariant}
            onClick={handleSetPlaybackRate}
            data-value={2}
          >
            2x
          </Button>
        </Group>
      </Stack>

      <Stack>
        <Group>
          <Title order={4}>Seek</Title>
          <input
            id="seek"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          {/* <Slider
            // id="seek"
            // type="range"
            min={0}
            // max={0.999999}
            step={0.001}
            max={1}
            // step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            // onMouseUp={handleSeekMouseUp}
          /> */}
        </Group>
        <Group>
          <Title order={4}>Volume</Title>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
          />
        </Group>

        <Checkbox
          checked={controls}
          onChange={handleToggleControls}
          labelPosition="left"
          label="Controls"
        />
        {/* <Switch
              checked={controls}
              onChange={handleToggleControls}
              labelPosition="left"
              label="Controls"
            /> */}

        <Checkbox
          checked={muted}
          onChange={handleToggleMuted}
          labelPosition="left"
          label="Muted"
        />

        <Checkbox
          checked={loop}
          onChange={handleToggleLoop}
          labelPosition="left"
          label="Loop"
        />

        <Checkbox
          checked={light}
          onChange={handleToggleLight}
          labelPosition="left"
          label="Light mode"
        />

        <Progress.Root size="xl">
          <Progress.Section value={played * 100}>
            <Progress.Label>Played</Progress.Label>
          </Progress.Section>
        </Progress.Root>

        <Progress.Root size="xl">
          <Progress.Section value={loaded * 100}>
            <Progress.Label>Loaded</Progress.Label>
          </Progress.Section>
        </Progress.Root>
      </Stack>

      <Group>
        <Title order={4}>Custom</Title>
        <input ref={urlInputRef} type="text" placeholder="Enter URL" />
        <button type="button" onClick={handleLoadCustomUrl}>
          Load
        </button>
      </Group>

      <Stack>
        <Title order={4}>State</Title>

        <Group>
          <Text>scr</Text>
          <Text>{src || "null"}</Text>
        </Group>

        <Group>
          <Text>playing</Text>
          <Text>{playing ? "true" : "false"}</Text>
        </Group>

        <Group>
          <Text>volume</Text>
          <Text>{volume.toFixed(3)}</Text>
        </Group>

        <Group>
          <Text>speed</Text>
          <Text>{playbackRate}</Text>
        </Group>

        <Group>
          <Text>played</Text>
          <Text>{played.toFixed(3)}</Text>
        </Group>

        <Group>
          <Text>loaded</Text>
          <Text>{loaded.toFixed(3)}</Text>
        </Group>

        {/* <tr>
              <th>duration</th>
              <td>
                <Duration seconds={duration} />
              </td>
            </tr>
            <tr>
              <th>elapsed</th>
              <td>
                <Duration seconds={duration * played} />
              </td>
            </tr>
            <tr>
              <th>remaining</th>
              <td>
                <Duration seconds={duration * (1 - played)} />
              </td>
            </tr> */}
      </Stack>
    </Stack>
  );
};
