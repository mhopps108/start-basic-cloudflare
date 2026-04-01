import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import ReactPlayer from "react-player";

export const Route = createFileRoute("/index copy")({
  loader: () => getData(),
  component: Home,
});

const getData = createServerFn().handler(() => {
  return {
    message: `Running in ${navigator.userAgent}`,
    myVar: env.MY_VAR,
    // assetURL: env.VITE_ASSET_URL,
  };
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data.message}</p>
      <p>{data.myVar}</p>

      {/* <video src="" /> */}
      <p>Running in Cloudflare-Workers</p>
      <div style={{ maxWidth: "400px" }}>
        <video controls width="100%" height="auto">
          <source
            src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <ReactPlayer
          src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
          controls
        />

        <ReactPlayer src="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
      </div>
    </div>
  );
}
