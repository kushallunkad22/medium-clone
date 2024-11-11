import React from 'react'

export interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  image: string;
  children?: React.ReactNode;
}

export function Card({ authorName, title, content, publishedDate, id, image }: BlogCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <a href={`/blog/${id}`} className="block">
        <img
          src={image}
          alt={title}
          className="aspect-[3/2] w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-4">{content.substring(0, 100)}...</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{authorName}</span>
            <span className="text-xs text-gray-500">{publishedDate}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 ${className}`} {...props} />
}