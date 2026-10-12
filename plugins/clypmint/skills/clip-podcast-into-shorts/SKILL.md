---
name: clip-podcast-into-shorts
description: Cut a podcast, stream, webinar or long talk into short vertical clips with Clypmint and schedule them. Use for "clip this podcast", "make shorts from this video", "find the best moments".
---

1. `get_profile`: credits left (clips cost 3 + 1 a minute of footage + 3 for each clip after the first).
2. Ask only for what is missing: how many clips (or all the good ones), how long (default 20-60 s; up to 95), vertical or the recording's own shape, any part of the recording or topics to look for first.
3. Price it: `edit_video { clips: { count, shape: '9:16', min_seconds?, max_seconds?, from_seconds?, to_seconds?, about? }, dry_run: true }` (with `source_duration_seconds` when known). Say the credits; go ahead with their yes.
4. Send the recording:
   - attached file (ChatGPT), or
   - `edit_video` without a file: give the private upload link, or in Claude Code run `node "${CLAUDE_PLUGIN_ROOT}/skills/clypmint-video-editing/scripts/upload.mjs" ./episode.mp4 '<upload link>'`, or
   - `source_url` (a public link) with `source_duration_seconds`, where links are open; the tool says when they are not.
     Use one `operation_id` and keep it on retries.
5. Narrate with `get_video_activity` (clips appear as the editor finds them). `check_video` lists each clip as an output with its id; never say ready before it does.
6. Fix names with `fix_captions { replace: [{ heard, spelled }] }`; change one clip in words with `revise_video { output_id }`.
7. Schedule: `schedule_plan { items: [{ video_id, output_id, platforms, post_at, caption }], timezone, approve: false }`, show it, then `approve: true` only with their explicit yes.
