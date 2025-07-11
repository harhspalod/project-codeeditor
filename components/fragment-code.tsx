import { CodeView } from './code-view'
import { CopyButton } from './ui/copy-button'
import { Download, FileText } from 'lucide-react'
import { useState } from 'react'

export function FragmentCode({
  files,
}: {
  files: { name: string; content: string }[]
}) {
  const [currentFile, setCurrentFile] = useState(files[0].name)
  const currentFileContent = files.find(
    (file) => file.name === currentFile,
  )?.content

  function download(filename: string, content: string) {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="flex flex-col h-full">
      {/* File tabs */}
      <div className="flex items-center justify-between p-2 border-b border-primary">
        <div className="flex gap-1 overflow-x-auto">
          {files.map((file) => (
            <button
              key={file.name}
              className={`pixel-tab text-xs ${
                file.name === currentFile ? 'active' : ''
              }`}
              onClick={() => setCurrentFile(file.name)}
            >
              <span className="inline-block w-2 h-2 bg-accent mr-2"></span>
              {file.name}
            </button>
          ))}
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => navigator.clipboard.writeText(currentFileContent || '')}
            className="pixel-button text-xs"
          >
            COPY
          </button>
          <button
            onClick={() => download(currentFile, currentFileContent || '')}
            className="pixel-button text-xs"
          >
            SAVE
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <div className="flex-1 overflow-auto pixel-code">
        <CodeView
          code={currentFileContent || ''}
          lang={currentFile.split('.').pop() || ''}
        />
      </div>
    </div>
  )
}