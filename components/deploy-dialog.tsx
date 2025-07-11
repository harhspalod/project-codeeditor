import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExternalLink } from 'lucide-react'

export function DeployDialog({
  url,
}: {
  url: string
}) {
  const handleDeploy = () => {
    window.open('https://vercel.com/new/clone?repository-url=' + encodeURIComponent(url), '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <ExternalLink className="mr-2 h-4 w-4" />
          Deploy to Vercel
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 w-80 flex flex-col gap-2">
        <div className="text-sm font-semibold">Deploy to Vercel</div>
        <div className="text-sm text-muted-foreground">
          Click the button below to deploy this project to Vercel.
        </div>
        <Button onClick={handleDeploy} variant="default">
          Open Vercel Deploy
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}