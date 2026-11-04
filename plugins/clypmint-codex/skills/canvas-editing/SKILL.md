---
name: canvas-editing
description: Edit a Clypmint video yourself, step by step, the way you would edit a design: read its layers and words, look at its frames, and change overlays, motion graphics, captions, cuts, sound and the picture. Free, no Clypmint model.
---

Use this when the user wants to direct the edit themselves, or asks for exact changes you can make: text and pictures on screen, a motion graphic, a caption look, a cut, a sound on a moment, a punch-in, a new shape. You are the editor; Clypmint holds the project, draws it, measures it and renders it. These tools cost no credits.

## The loop

1. Read: `get_basic_info` for the shape, length, frame rate and `version_id`; `get_timeline` for the layers and overlays with their times; `get_transcript` for every spoken word with its number and seconds.
2. Look: `get_screenshot` at the seconds you will change (up to 6 at once).
3. Change one thing at a time, passing `base_version` (the `version_id` you read):
   - text, a picture or a clip on screen: `put_overlay` (x and y are the box's centre, fractions of the frame)
   - a motion graphic (counter, chart, map, label, reveal): `write_graphic` (read `get_guide` topic `graphics` first)
   - move, restyle, retime or swap a layer: `update_layer`; remove an overlay or hide a layer: `delete_layer`
   - take time out: `cut` (by seconds or by word numbers)
   - captions: `set_captions`; sound: `search_sounds`, then `set_audio`; grade, camera, shape, cut-out: `set_look`
   - another of their videos with its sound: `add_clip`; play the video again at a speed: `set_look` replay
4. Look again with `get_screenshot` and fix what is off before the next change.
5. Tell the user what changed and where, in seconds. They watch it in the Studio at `studio_url`.

## Their files

`import_media` brings in a picture, clip or song from a public link (a fal or Higgsfield output, a CDN file) and returns its `asset_id` for `put_overlay`, `add_clip` or `set_audio`.

## Rules

- Each change saves a new version. A change on a version that moved on is refused: read again and redo it. `list_versions` and `restore_version` undo.
- After a cut, everything later moved earlier: read the timeline and transcript again.
- Look before and after. Captions and text must not cover a face; light text needs a dark area or a backing.
- Read `get_guide` (topics: start, canvas, graphics, captions, sound, motion, type-and-placement, faceless-explainer, talking-video, references) for craft before a kind of work you have not done in this conversation.
- Never show ids to the user.
