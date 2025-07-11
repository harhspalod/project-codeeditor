'use client'

import { RepoBanner } from './repo-banner'
import { ArrowUp, Paperclip, Square, X } from 'lucide-react'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export function ChatInput({
  retry,
  isErrored,
  errorMessage,
  isLoading,
  isRateLimited,
  stop,
  input,
  handleInputChange,
  handleSubmit,
  isMultiModal,
  files,
  handleFileChange,
  children,
}: {
  retry: () => void
  isErrored: boolean
  errorMessage: string
  isLoading: boolean
  isRateLimited: boolean
  stop: () => void
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isMultiModal: boolean
  files: File[]
  handleFileChange: (change: SetStateAction<File[]>) => void
  children: React.ReactNode
}) {
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileChange((prev) => {
      const newFiles = Array.from(e.target.files || [])
      return [...prev, ...newFiles]
    })
  }

  function handleFileRemove(file: File) {
    handleFileChange((prev) => prev.filter((f) => f !== file))
  }

  const filePreview = useMemo(() => {
    if (files.length === 0) return null
    return Array.from(files).map((file) => {
      return (
        <div className="relative" key={file.name}>
          <button
            onClick={() => handleFileRemove(file)}
            className="absolute -top-1 -right-1 w-4 h-4 bg-destructive border border-destructive pixel-text text-xs flex items-center justify-center"
          >
            ×
          </button>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-8 h-8 object-cover border border-primary"
          />
        </div>
      )
    })
  }, [files])

  function onEnter(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      if (e.currentTarget.checkValidity()) {
        handleSubmit(e)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={onEnter}
      className="p-4 bg-background border-t-2 border-primary"
    >
      {isErrored && (
        <div className="pixel-panel p-3 mb-4 bg-destructive bg-opacity-20 border-destructive">
          <div className="pixel-text text-xs text-destructive mb-2">
            ERROR:
          </div>
          <div className="pixel-text text-xs mb-2">
            {errorMessage}
          </div>
          <button
            className="pixel-button text-xs"
            onClick={retry}
          >
            RETRY
          </button>
        </div>
      )}
      
      <div className="pixel-panel p-3">
        <div className="flex items-center gap-2 mb-2">
          {children}
        </div>
        
        <TextareaAutosize
          autoFocus={true}
          minRows={2}
          maxRows={6}
          className="pixel-input w-full resize-none"
          required={true}
          placeholder="DESCRIBE YOUR CODE..."
          disabled={isErrored}
          value={input}
          onChange={handleInputChange}
        />
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              multiple={true}
              className="hidden"
              onChange={handleFileInput}
            />
            
            <button
              disabled={!isMultiModal || isErrored}
              type="button"
              className="pixel-button text-xs disabled:opacity-50"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              ATTACH
            </button>
            
            {files.length > 0 && (
              <div className="flex gap-2">
                {filePreview}
              </div>
            )}
          </div>
          
          <div>
            {!isLoading ? (
              <button
                disabled={isErrored}
                className="pixel-button text-xs disabled:opacity-50"
                type="submit"
              >
                GENERATE
              </button>
            ) : (
              <button
                className="pixel-button text-xs bg-destructive border-destructive"
                onClick={(e) => {
                  e.preventDefault()
                  stop()
                }}
              >
                STOP
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-2">
        <div className="pixel-text text-xs opacity-50">
          POWERED BY Code Army
        </div>
      </div>
    </form>
  )
}