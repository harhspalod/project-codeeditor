import Logo from './logo'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Session } from '@supabase/supabase-js'
import { ArrowRight, LogOut, Trash, Undo } from 'lucide-react'

export function NavBar({
  session,
  showLogin,
  signOut,
  onClear,
  canClear,
  onSocialClick,
  onUndo,
  canUndo,
}: {
  session: Session | null
  showLogin: () => void
  signOut: () => void
  onClear: () => void
  canClear: boolean
  onSocialClick: (target: 'github' | 'x' | 'discord') => void
  onUndo: () => void
  canUndo: boolean
}) {
  return (
    <nav className="pixel-header w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary border-2 border-primary"></div>
          <span className="pixel-text text-primary">GEMINI CODE EDITOR</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="pixel-button text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          UNDO
        </button>
        <button
          onClick={onClear}
          disabled={!canClear}
          className="pixel-button text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CLEAR
        </button>
        
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="pixel-button text-xs">
                MENU
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="pixel-panel">
              <DropdownMenuLabel className="pixel-text text-xs">
                {session.user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSocialClick('github')} className="pixel-text text-xs">
                GITHUB
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSocialClick('discord')} className="pixel-text text-xs">
                DISCORD
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="pixel-text text-xs">
                LOGOUT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button onClick={showLogin} className="pixel-button text-xs">
            LOGIN
          </button>
        )}
      </div>
    </nav>
  )
}