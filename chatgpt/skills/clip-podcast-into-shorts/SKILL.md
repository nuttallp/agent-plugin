---
name: clip-podcast-into-shorts
description: Turn a podcast, interview, webinar or long recording into Clypmint Shorts with complete thoughts and reviewable separate outputs.
---

Read the main video-editing skill. Reuse the requested clip count, source range, topics, length and shape. When missing, choose vertical short clips and confirm only choices that materially affect scope or cost.

Read `get_profile` and the current `edit_video` clips schema. Estimate the exact request with `dry_run: true` and known source duration. Links and clips are account-gated; do not infer support from a plan name. Use the selected recording or private upload fallback when the tool refuses a source link. Local coding environments use the main skill's upload helper, not an invented attachment URL.

Submit `edit_video` with the agreed `clips`, style, full instructions and a stable operation ID. Resume that same request after an interruption. Follow real activity, then inspect every output with `check_video`. Review whether the opening makes sense, the clip contains one complete thought, speaker framing is clear, captions are accurate and the audio is clean. Keep the chosen output ID for changes and requested download access.

Prepare a proposed schedule with `schedule_plan` using `approve: false` when asked. Schedule only the explicitly approved outputs, accounts, captions, times, timezone and platform choices. Review-only clips stay drafts; a host task or provider appointment must be verified separately.
