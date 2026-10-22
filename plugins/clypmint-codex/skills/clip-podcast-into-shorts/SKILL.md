---
name: clip-podcast-into-shorts
description: Turn a podcast, interview, webinar or long recording into Clypmint Shorts, each one complete thought, in one call.
---

"Turn this podcast into 10 shorts": call `edit_video` with `clips: {count: 10, shape: "9:16"}` in your first reply. Add only what they asked for: `clips.about` for topics in their words, `clips.min_seconds`/`clips.max_seconds` for a length, `clips.from_seconds`/`clips.to_seconds` for a part of the recording, `style_id` for a style they named, `speaker_name` or `names` for spellings. "All the good ones" is `count: "all"`. Clips are their own job: no `length`, `kind`, `hooks` or `shorts` beside them.

A direct link to a video file (an https link ending in .mp4, .mov or .webm) goes in `source_url` instead of a file. YouTube links are not available yet: ask the user to upload the file, and give them the private upload link from the answer.

An exact part ("the bit from 12:30 to 13:20"): `clips: {count: 1, from_seconds: 750, to_seconds: 800, min_seconds: 20, max_seconds: 60}`. The finder picks the best moment inside that window.

Attach the recording in ChatGPT; elsewhere give the user the private upload link from the answer. In Claude Code or Codex with the file on disk, use the main skill's upload helper.

`check_video` lists every clip as an output. Show them and keep the `output_id` of the one they want to change; changes follow the main skill's table. Posting needs their yes: `schedule_plan` with `approve: false` first.

Use a clip in another video: `save_clip` `{video_id, output_id}` keeps it and returns an `asset_id`. Then call `edit_video` with the user's own footage (or `create_video`) with that id in `asset_ids`, and say where it goes in `instructions`: "open the video with it", "cut it in around the pricing point", or nothing more if it is the whole video (download it from `check_video`).
