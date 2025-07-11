export type LogoStyle = 'rocket' | 'star'

export default function Logo({
  style = 'rocket',
  ...props
}: { style?: LogoStyle } & React.SVGProps<SVGSVGElement>) {
  return style === 'star' ? (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15 8.5 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8.5 12 2" />
    </svg>
  ) : (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C8 2 4 6 4 10c0 4 4 8 8 8s8-4 8-8c0-4-4-8-8-8Zm0 2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6Zm-1 3v2H9v2h2v2h2v-2h2v-2h-2V7h-2Zm-1 12h4v2h-4v-2Z" />
    </svg>
  )
}
