# Hero video

The homepage hero (`components/sections/hero.tsx`) looks for these files:

```
public/videos/hero.webm   (preferred — smaller file size)
public/videos/hero.mp4    (fallback for browsers that don't support webm)
```

Until you add real files here, the hero gracefully falls back to the
generated poster image at `public/images/hero-poster.jpg`, so the site
still looks complete — you'll just see a static background instead of
motion.

## Recommendations

- **Length:** 10–20 seconds, looping seamlessly (the hero sets `loop`).
- **Resolution:** 1920×1080 is plenty; anything larger just adds load time.
- **File size:** aim for well under 5 MB. Compress with a tool like
  `ffmpeg`, e.g.:

  ```bash
  ffmpeg -i source.mov -vcodec libx264 -crf 28 -preset veryslow -an public/videos/hero.mp4
  ffmpeg -i source.mov -vcodec libvpx-vp9 -crf 32 -b:v 0 -an public/videos/hero.webm
  ```

- **No audio needed** — the hero always loads muted (autoplay requires it
  in every modern browser), and the custom mute/unmute control simply
  toggles the muted state if you do include an audio track.
- **Content ideas:** abstract data visualizations, particle/network
  animations, or slow-motion footage of your product or team — anything
  that reads well at low contrast, since text is overlaid on top.

Once the files are in place, no code changes are required — the `<video>`
element in the hero will pick them up automatically.
