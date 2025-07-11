'use client'

import { FragmentInterpreter } from './fragment-interpreter'
import { FragmentWeb } from './fragment-web'
import { ExecutionResult } from '@/lib/types'

export function FragmentPreview({ result }: { result: ExecutionResult }) {
  if (result.template === 'code-interpreter-v1') {
    return (
      <div className="pixel-preview h-full">
        <FragmentInterpreter result={result} />
      </div>
    )
  }

  // 💡 Render raw HTML if provided (fallback)
  if (result.html) {
    return (
      <div className="pixel-preview h-full">
        <iframe
          title="HTML Preview"
          srcDoc={result.html}
          className="w-full h-full border-none"
          sandbox=""
        />
      </div>
    )
  }

  return (
    <div className="pixel-preview h-full">
      <FragmentWeb result={result} />
    </div>
  )
}
