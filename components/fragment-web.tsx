import { ExecutionResultWeb } from '@/lib/types'
import { RotateCw } from 'lucide-react'
import { useState } from 'react'

export function FragmentWeb({ result }: { result: ExecutionResultWeb }) {
  const [iframeKey, setIframeKey] = useState(0)
  if (!result) return null

  function refreshIframe() {
    setIframeKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Preview iframe */}
      <div className="flex-1 border-2 border-primary bg-black">
        <iframe
          key={iframeKey}
          className="h-full w-full"
          sandbox="allow-forms allow-scripts allow-same-origin"
          loading="lazy"
          src={result.url}
        />
      </div>
      
      {/* URL bar */}
      <div className="pixel-header flex items-center justify-between">
        <button
          onClick={refreshIframe}
          className="pixel-button text-xs"
        >
          REFRESH
        </button>
        
        <div className="flex-1 mx-2 pixel-input text-xs overflow-hidden">
          <div className="truncate">
            {result.url}
          </div>
        </div>
        
        <button
          onClick={() => navigator.clipboard.writeText(result.url)}
          className="pixel-button text-xs"
        >
          COPY URL
        </button>
      </div>
    </div>
  )
}