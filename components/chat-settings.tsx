import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { LLMModelConfig } from '@/lib/models'
import { Settings2 } from 'lucide-react'

export function ChatSettings({
  languageModel,
  onLanguageModelChange,
}: {
  languageModel: LLMModelConfig
  onLanguageModelChange: (model: LLMModelConfig) => void
}) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground h-6 w-6 rounded-sm">
                <Settings2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Gemini settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start">
        <div className="flex flex-col gap-2 px-2 py-2">
          <Label htmlFor="apiKey">Gemini API Key</Label>
          <Input
            name="apiKey"
            type="password"
            placeholder="Auto"
            required={true}
            defaultValue={languageModel.apiKey}
            onChange={(e) =>
              onLanguageModelChange({
                apiKey:
                  e.target.value.length > 0 ? e.target.value : undefined,
              })
            }
            className="text-sm"
          />
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1.5 px-2 py-2">
          <span className="text-sm font-medium">Parameters</span>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Max tokens
            </span>
            <Input
              type="number"
              defaultValue={languageModel.maxTokens}
              min={50}
              max={10000}
              step={1}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  maxTokens: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Temperature
            </span>
            <Input
              type="number"
              defaultValue={languageModel.temperature}
              min={0}
              max={2}
              step={0.01}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  temperature: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}