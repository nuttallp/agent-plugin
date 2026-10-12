---
name: ad-with-three-hooks
description: Turn footage into a paid-social ad with Clypmint - three different openings (hooks) on one body, in the shapes the ad platforms want. Use for "make this an ad", "give me 3 hooks", "ad variations", "edit all our ads".
---

1. `get_profile`: credits left. An ad with 3 hooks in 2 formats costs 3 + 1 a minute + 3 for each of the 5 extra outputs.
2. Ask only for what is missing: the offer and the action you want, the shapes (9:16 for Reels/TikTok, 1:1 or 4:5 for feeds), the speaker's name spelled right, sound effects, music (`import_asset` gives a `music_staging_key`).
3. Price it: `edit_video { purpose: 'ad', hooks: 3, formats: ['9:16', '1:1'], dry_run: true }`; go ahead with their yes.
4. `edit_video { purpose: 'ad', hooks: 3, formats, sound_effects, speaker_name, instructions, style_id?, operation_id }` with the file, the private upload link (Claude Code: the bundled `upload.mjs`), or `source_url` where links are open.
5. Narrate with `get_video_activity`; `check_video` lists every output (`main-1-9x16`, `hook-2-9x16`, `hook-3-9x16`, and each format). Never say ready before it does.
6. Change one opening: `revise_video { video_id, output_id: 'hook-2-9x16', change: 'open on the price' }` (one change round). Exact fixes are free: `apply_edits` for a scene's text or picture, `fix_captions` for a name. Undo with `restore_version`.
7. For many ads, repeat per video with its own `operation_id`, and `remember` what the brand always wants (tone, CTA, spellings).
