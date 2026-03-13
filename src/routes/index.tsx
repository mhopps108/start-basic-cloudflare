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
  }
})

function Home() {
  const data = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <p>{data.message}</p>
      <p>{data.myVar}</p>

      <video src="https://1fcd37eadd955e21cf41ee5b6586ddbc.r2.cloudflarestorage.com/baseball/This%20post%20repurposes%20a%202022%20viral%20video%20of%20Maggie,%20a%20German%20Shepherd%20trained%20as%20a%20'hockey%20goalie.mp4" />
      <p>Running in Cloudflare-Workers</p>
    </div>
  )
}
