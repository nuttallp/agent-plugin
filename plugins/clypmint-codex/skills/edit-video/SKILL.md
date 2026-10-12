---
name: edit-video
description: Use Clypmint to edit shared footage, create videos from an idea or script, cut Shorts, fix captions or scenes, review versions, and plan content with the user.
---

## Start with the user's job

The host assistant develops the brief, script and requested changes with the user. Clypmint performs the media work and returns visual results. Reuse the decisions already given. For footage use `edit_video`; for an idea or script use `create_video`. Do not request footage for a video from words.

Read `get_profile` when account identity or allowance matters. Use the linked account's actual rights; an unavailable read is unknown, not an empty allowance. Explain verified restrictions. ChatGPT receives no subscription prices, purchase suggestion or checkout link. Other hosts may return the supported Studio billing link.

For a large request, use `dry_run: true` to estimate credits before admission. The user's existing explicit authorization can cover the requested job; obtain a decision when scope or cost materially changes. Creating a video never authorizes posting it.

## Styles and media

Use `browse_styles` for ready previews. Respect a style's supported content and format; a saved style must be ready. `copy_style` builds a reusable style from a reference and `adjust_style` changes a saved copy. Preserve style version when the user chose one. A blocked reference link needs the reference file rather than an invented extraction.

With footage, send the complete brief in `edit_video`: purpose, hooks, shorts or clips, formats, speaker spelling, sound_effects, instructions, style and explicitly chosen assets. Use vertical for social and horizontal for YouTube when no shape was specified. Clips and source links are account-gated; use the private upload fallback when the tool says a link is unavailable.

Pass a genuine host-provided attachment descriptor only when the host supports it. Otherwise call `edit_video` without a file and show its private upload link (15 minutes). In a local coding environment, upload the file the user selected with [the upload helper](scripts/upload.mjs): run `node <this skill directory>/scripts/upload.mjs <selected-file> <private-upload-link>`. Resolve the directory from the loaded skill path. Never invent a downloadable attachment or assume access to a whole conversation, local folder or another account. If a link expires, resume the existing upload request and obtain its current link before admitting a new edit.

`list_assets` identifies account-owned reusable media. `import_asset` accepts the file types and source mechanisms in its current schema; image/audio import differs by host. Preserve staging keys. A tool's refusal is the source of truth for unsupported media.

## One request, one operation

Choose a stable operation ID for every mutation and preserve the original arguments on retries. Keep import, video, plan and output IDs between calls. A timeout or reconnect resumes the same operation; a deliberate new request gets a new ID. Carry the current version as `base_version` for a creative revision and `expectedEditId` for scheduling. Repeated requests must not consume another edit or create duplicate posts.

## Progress and review

After admission share the Studio project link. Use `get_video_activity` for real stages and useful progress, and `check_video` for the result. Reads never admit another job. Avoid rapid polling; roughly 20–30 seconds is appropriate while an edit is active.

Only `check_video` establishes readiness. During a revision the previous version may remain playable; identify it as the previous cut and wait for the revised version. Repeat a failed video's `problem` and `next_step` accurately. A finished render, playable media and an accepted edit are distinct outcomes.

Show the result, preserve earlier versions, and carry `output_id` when the user selects one hook, Short or format. Ask `check_video` with `with_download: true` only when the user requests the file. Signed playback/download URLs stay in the visual card's private metadata. Continue the same project in Studio when useful.

## Choose the smallest useful change

- Inspect `get_project_context` before referring to scene IDs, word ranges or caption lines.
- Use `fix_captions` for exact words or a spelling replacement. It does not spend a creative round. A two-word mishearing cannot become one caption word; remember the spelling when requested and use a creative revision for this video.
- Use `apply_edits` for supported direct scene, picture, text, caption, word-cut and sound changes. Its operations apply together or return an explicit refusal; do not call a refused edit successful.
- Use `revise_video` for a creative change. Preserve unrelated footage, cuts, graphics and sound. Name `output_id` to change one output. Add captions explicitly when requested on a captionless style; use contain framing when the user asks to preserve the complete portrait.
- Use `list_versions` and `restore_version` to undo. `get_thread` shows edit history.
- Use `remember`, `list_memory` and `forget` for lasting preferences the user wants retained.

Preserve the style's sound defaults, sound effects and the user's explicit music direction. Do not invent a music request or replace the bed while making an unrelated change. An explicit no-music or no-effects request wins. Keep the exact approved script when `create_video` receives `script`; `idea` permits narration writing. Duration options and narrators come from the current schema. `create_videos` handles up to 10 items with shared defaults and stable per-item operation IDs.

## Content plans and publication

For a month of content, read [the content workflow](references/content-workflows.md). Write concepts, exact scripts and captions in the conversation, then send them as `items` to `plan_content`. This plans only. Show the plan and credit estimate; use `edit_content_plan` for changes. `approve_plan` makes videos and can schedule their publication, so use it only after approval explicitly covers both generation and publication. A review-only batch uses `create_videos` instead.

For existing videos, `schedule_plan` with `approve: false` checks slots without posting. After explicit publication approval, `approve: true` schedules eligible outputs. `get_content_plan` and `list_posts` show outcomes; `post_content_plan` resumes approved slots waiting for connected accounts or a new time.

Publishing requires `clypmint.publish` and connected accounts. Establish the approved output/version, destination account, caption, date and IANA timezone. Obtain the required YouTube audience/visibility and TikTok privacy, interactions, disclosure and sharing choices. `connect_social_accounts` opens an account-owner authorization link when requested. Never expand permissions silently.

Provider-confirmed scheduling, pending acknowledgment, partial delivery and actual publication are separate states. Do not repost successful destinations after a partial failure. Recurring creative work requires a supported host scheduler and an agreed brief, cadence, timezone and budget. A written plan is not an active automation. Default to drafts when publication was not authorized.
