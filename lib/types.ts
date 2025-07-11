import { TemplateId } from './templates'
import { ExecutionError, Result } from '@e2b/code-interpreter'

type ExecutionResultBase = {
  sbxId: string
}

export type ExecutionResultInterpreter = ExecutionResultBase & {
  template: 'code-interpreter-v1'
  stdout: string[]
  stderr: string[]
  runtimeError?: ExecutionError
  cellResults: Result[]
}

export type ExecutionResultWeb = ExecutionResultBase & {
  template: Exclude<TemplateId, 'code-interpreter-v1'>
  url: string
  html?: string // ✅ Add this
  file?: string
  title?: string
}

export type ExecutionResult = ExecutionResultInterpreter | ExecutionResultWeb
