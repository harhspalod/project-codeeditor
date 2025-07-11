import { Message } from '@/lib/messages'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { LoaderIcon, Terminal } from 'lucide-react'
import { useEffect } from 'react'

export function Chat({
  messages,
  isLoading,
  setCurrentPreview,
}: {
  messages: Message[]
  isLoading: boolean
  setCurrentPreview: (preview: {
    fragment: DeepPartial<FragmentSchema> | undefined
    result: ExecutionResult | undefined
  }) => void
}) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [JSON.stringify(messages)])

  return (
    <div
      id="chat-container"
      className="flex flex-col pb-12 gap-4 overflow-y-auto max-h-full pixel-chat p-4"
    >
      {messages.map((message: Message, index: number) => (
        <div
          className={`pixel-message ${message.role} ${message.role === 'user' ? 'user' : 'assistant'}`}
          key={index}
        >
          <div className="pixel-text text-xs mb-2 opacity-70">
            {message.role === 'user' ? '> USER:' : '> GEMINI:'}
          </div>
          
          {message.content.map((content, id) => {
            if (content.type === 'text') {
              return (
                <div key={id} className="pixel-text text-xs mb-2">
                  {content.text}
                </div>
              )
            }
            if (content.type === 'code') {
              return (
                <div key={id} className="pixel-code text-xs mb-2">
                  {content.text}
                </div>
              )
            }
            if (content.type === 'image') {
              return (
                <img
                  key={id}
                  src={content.image}
                  alt="uploaded"
                  className="w-16 h-16 object-cover border-2 border-primary mb-2"
                />
              )
            }
          })}
          
          {message.object && (
            <div
              onClick={() =>
                setCurrentPreview({
                  fragment: message.object,
                  result: message.result,
                })
              }
              className="pixel-panel p-3 cursor-pointer hover:bg-opacity-20 hover:bg-primary mt-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent border border-accent"></div>
                <div>
                  <div className="pixel-text text-xs text-accent">
                    {message.object.title || 'CODE FRAGMENT'}
                  </div>
                  <div className="pixel-text text-xs opacity-70 mt-1">
                    CLICK TO VIEW RESULT
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="pixel-message assistant">
          <div className="pixel-text text-xs mb-2 opacity-70">
            > GEMINI:
          </div>
          <div className="flex items-center gap-2 pixel-text text-xs">
            <div className="w-2 h-2 bg-primary animate-pulse"></div>
            <span>GENERATING CODE...</span>
          </div>
        </div>
      )}
    </div>
  )
}