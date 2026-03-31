import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/')({
  loader: () => getData(),
  component: Home,
})

const getData = createServerFn().handler(() => {
  return {
    message: `Running in ${navigator.userAgent}`,
    myVar: env.MY_VAR,
    assetURL: env.VITE_ASSET_URL,
  }
})

function Home() {
  const data = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data.message}</p>
      <p>{data.myVar}</p>

      {/* <video src="" /> */}
      <p>Running in Cloudflare-Workers</p>
      <div style={{maxWidth: "400px"}}>
      <video controls width="100%" height="auto">
        {/* <source src="https://pub-1f4c102a3e014fbaa397381bcc3a1fe5.r2.dev/think.mp4" type="video/mp4" /> */}
        <source src={`${data.assetURL}/think.mp4`} type="video/mp4" />
        {/* <source src="https://1fcd37eadd955e21cf41ee5b6586ddbc.r2.cloudflarestorage.com/baseball/think.mp4" type="video/mp4" /> */}
    Your browser does not support the video tag.
</video>
</div>
    </div>
  )
}
