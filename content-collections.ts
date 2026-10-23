import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

// Each project shows up as an "ITEM" on the Check out my work! page.
const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    // Short item-style flavor text, shown like "* (It's super effective.)"
    flavor: z.string(),
    description: z.string(),
    year: z.string(),
    tags: z.array(z.string()),
    order: z.number().default(99),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(), // e.g. "projects/image.png"
    imageAlt: z.string().optional(), // description for the image
    video: z.string().optional(), // e.g. "/projects/video.mp4"
    videoAlt: z.string().optional(), // description for video
    content: z.string(),
  }),
})

export default defineConfig({
  collections: [projects],
})