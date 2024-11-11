import { Button } from './Button'

export function Appbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <a className="flex items-center space-x-2" href="/">
          <img src="https://via.placeholder.com/32" alt="Logo" width={32} height={32} />
          <span className="text-xl font-bold">Medium</span>
        </a>
        <nav className="flex items-center space-x-4">
          <a className="text-sm font-medium hover:underline" href="/about">
            About
          </a>
          <a className="text-sm font-medium hover:underline" href="/contact">
            Contact
          </a>
          <Button variant="outline">
            <a href="/publish">Publish</a>
          </Button>
          <Button>Follow</Button>
        </nav>
      </div>
    </header>
  )
}