import { DeployDialog } from './deploy-dialog'
import { FragmentCode } from './fragment-code'
import { FragmentPreview } from './fragment-preview'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { ChevronsRight, LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function Preview({
  selectedTab,
  onSelectedTabChange,
  isChatLoading,
  isPreviewLoading,
  fragment,
  result,
  onClose,
}: {
  selectedTab: 'code' | 'fragment'
  onSelectedTabChange: Dispatch<SetStateAction<'code' | 'fragment'>>
  isChatLoading: boolean
  isPreviewLoading: boolean
  fragment?: DeepPartial<FragmentSchema>
  result?: ExecutionResult
  onClose: () => void
}) {
  if (!fragment) {
    return null
  }

  const isLinkAvailable = result?.template !== 'code-interpreter-v1'

  return (
    <div className="pixel-panel h-full flex flex-col scanlines crt-flicker">
      {/* Header */}
      <div className="pixel-header flex items-center justify-between">
        <button
          onClick={onClose}
          className="pixel-button text-xs"
        >
          CLOSE
        </button>
        
        <div className="flex gap-1">
          <button
            className={`pixel-tab text-xs ${selectedTab === 'code' ? 'active' : ''}`}
            onClick={() => onSelectedTabChange('code')}
          >
            {isChatLoading && (
              <span className="inline-block w-2 h-2 bg-primary animate-pulse mr-2"></span>
            )}
            CODE
          </button>
          <button
            disabled={!result}
            className={`pixel-tab text-xs ${selectedTab === 'fragment' ? 'active' : ''} disabled:opacity-50`}
            onClick={() => onSelectedTabChange('fragment')}
          >
            PREVIEW
            {isPreviewLoading && (
              <span className="inline-block w-2 h-2 bg-accent animate-pulse ml-2"></span>
            )}
          </button>
        </div>
        
        {result && isLinkAvailable && (
          <DeployDialog url={result.url!} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedTab === 'code' && fragment.code && fragment.file_path && (
          <div className="h-full">
            <FragmentCode
              files={[
                {
                  name: fragment.file_path,
                  content: fragment.code,
                },
              ]}
            />
          </div>
        )}
        
        {selectedTab === 'fragment' && result && (
          <div className="h-full">
            <FragmentPreview result={result as ExecutionResult} />
          </div>
        )}
        
        {selectedTab === 'fragment' && !result && (
          <div className="h-full flex items-center justify-center">
            <div className="pixel-text text-xs opacity-50">
              NO PREVIEW AVAILABLE
            </div>
          </div>
        )}
      </div>
    </div>
  )
}