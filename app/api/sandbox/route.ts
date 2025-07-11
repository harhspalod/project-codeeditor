import { FragmentSchema } from '@/lib/schema'

export const maxDuration = 60

export async function POST(req: Request) {
  const {
    fragment,
  }: {
    fragment: FragmentSchema
  } = await req.json()

  console.log('📦 Received fragment:', fragment)

  if (!fragment.code || !fragment.file_path) {
    return new Response(JSON.stringify({ error: 'Missing code or file path.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(
    JSON.stringify({
      html: fragment.code,
      file: fragment.file_path,
      title: fragment.title || 'HTML Preview',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
