# Design reference

This is the shared design direction. Final tokens live in `src/app/globals.css`, and the components can be reviewed at `/design-system`. The infographic is a reference for direction, not a design to copy.

## Experience goals

The site should feel beautiful, modern, trustworthy and rooted in Bhubaneswar. Motion and interaction should make it feel polished, without getting in the way of finding information.

## Visual direction

| Element           | Direction                                                          |
| ----------------- | ------------------------------------------------------------------ |
| Ink               | Deep navy, for trust and the night-sky hero                        |
| Saffron           | Warm orange, for actions and local character                       |
| Sand              | Warm neutrals based on Kalinga sandstone                           |
| Supporting colors | Temple green, lotus pink and river blue, for badges and categories |
| Layout            | Generous spacing, clear hierarchy and image-led cards              |
| Typography        | Fraunces for display headings, Figtree for interface and body text |
| Logo              | An original mark based on a Kalinga-style temple tower             |

Colors, fonts, spacing, shadows and radii must meet WCAG AA contrast. Use the theme tokens instead of hard-coded values.

## Motion

- Use short, smooth transitions for page sections, hover, focus and menus.
- Animate `transform` and `opacity` to keep motion smooth.
- Respect `prefers-reduced-motion`.
- Never hide content or delay important information behind an animation.

## Responsive design

- Design mobile-first, then adapt for tablet and desktop.
- Test at 360 px, 768 px, 1024 px and 1440 px.
- Give touch controls a target of at least 44 by 44 px.
- Prevent horizontal page scrolling.

## Accessibility

- Support full keyboard use with visible focus states.
- Provide meaningful alternative text for images.
- Never use color alone to communicate meaning.

## Content and images

- Use images only with clear rights to publish them.
- Add every photo to `src/lib/photos.ts` with its author, license and source. The credits page is built from that list.
- Provide a fallback when an image is missing.
- Show the source and last-updated time on factual content.
- Display missing information as unavailable.
