import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { DialogueBox } from '@/components/DialogueBox'
import { PageTitle } from '@/components/PageTitle'
import { Soul } from '@/components/Soul'
import { sfx } from '@/lib/sound'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/work')({
  head: () => ({ meta: [{ title: 'Check out my work!' }] }),
  component: Work,
})

function Work() {
  const projects = [...allProjects].sort((a, b) => a.order - b.order)
  const [selected, setSelected] = useState(0)
  const project = projects[selected]

  function choose(i: number) {
    if (i === selected) return
    sfx.move()
    setSelected(i)
  }

    return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
      <PageTitle kicker="ITEM">* Check out my work!</PageTitle>
      <p className="-mt-4 mb-8 text-2xl text-white/75">
        * You open your inventory. It's full of projects. Pick one to inspect it.
      </p>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Inventory list */}
        <div className="ut-box p-4 sm:p-5">
          <ul
            role="listbox"
            aria-label="Projects"
            aria-activedescendant={`project-${selected}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                choose((selected + 1) % projects.length)
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                choose((selected - 1 + projects.length) % projects.length)
              }
            }}
            className="space-y-1 focus-visible:outline-none"
          >
            {projects.map((p, i) => (
              <li
                key={p._meta.path}
                id={`project-${i}`}
                role="option"
                aria-selected={i === selected}
                onClick={() => choose(i)}
                onMouseEnter={() => choose(i)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 py-1 text-2xl sm:text-3xl',
                  i === selected ? 'text-ut-yellow' : 'hover:text-ut-yellow',
                )}
              >
                <Soul className={cn('h-4 w-4', i !== selected && 'invisible')} />
                <span className="truncate">* {p.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-pixel text-[0.5rem] text-ut-gray">↑ ↓ TO BROWSE</p>
        </div>

        {/* Item details */}
        <article className="flex flex-col gap-5" aria-live="polite">
          <DialogueBox lines={[`* ${project.flavor}`]} />
          <div className="ut-box flex-1 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-pixel text-sm leading-relaxed text-ut-yellow sm:text-base">
                {project.title}
              </h2>
              <span className="font-pixel text-[0.6rem] text-ut-gray">{project.year}</span>
            </div>

            {project.image && (
              <img
                src={project.image}
                alt={project.imageAlt ?? ''}
                loading="lazy"
                className="mt-4 w-full border-4 border-white"
                style={{ imageRendering: 'pixelated' }} // optional, only for pixel art
              />
            )}
            {project.video && (
              <video
                src={project.video}
                poster={project.image}
                aria-label={project.videoAlt}
                controls
                playsInline
                preload="metadata"
                className="mt-4 w-full border-4 border-white"
              />
            )}

            <p className="mt-4 text-2xl">{project.description}</p>
            {project.content.trim() && (
              <p className="mt-3 text-xl text-white/70">* {project.content.trim()}</p>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-2 border-ut-blue px-2 text-lg leading-7 text-ut-blue"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.select()}
                  className="ut-button px-4 py-3 text-[0.65rem]"
                >
                  <Soul className="h-3 w-3" /> Use
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.select()}
                  className="ut-button px-4 py-3 text-[0.65rem]"
                >
                  <Soul className="h-3 w-3" /> Inspect code
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
