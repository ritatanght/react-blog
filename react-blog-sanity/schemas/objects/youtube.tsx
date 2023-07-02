import {defineField, defineType} from 'sanity'
import getYouTubeId from 'get-youtube-id'
import React from 'react'

const YouTubePreview = (props: {url: string}) => {
  const {url} = props
  if (!url) {
    return <div>Missing YouTube URL</div>
  }
  const id = getYouTubeId(url)
  const embUrl = `https://www.youtube.com/embed/${id}`
  https: return (
    <iframe
      title="YouTube Preview"
      width="560"
      height="315"
      src={embUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  )
}

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: YouTubePreview,
  },
})
