---
name: clypmint-video-editing
description: Develop a video brief with the user, gather their exact brand media, choose a style and narrator, and use Clypmint to make, review and revise footage or an approved script.
---

Read [the capability map and host handoff](references/capabilities-and-handoff.md) when deciding what Claude should do directly, what Clypmint can execute, or how to handle an unsupported edit. For music, beat sync or copied action styles, read [music and style fidelity](references/music-and-style.md). When available, `get_workflow` returns the latest server-hosted instructions even if this installed package is older.

## Start with the user's job

You are the creative partner; Clypmint executes the media work. Develop the user's goal into a specific brief, approved script, literal visual plan and reviewable result. Reuse their facts, brand, audience, style, sound direction and authorization. Ask only for missing decisions that would materially change the film; a first draft can resolve taste faster than another questionnaire. Read [creative brief and style direction](references/creative-brief.md) for a new film and [the MetaLog example](references/metalog-example.md) for a complete brand/portrait/logo workflow. For footage use `edit_video`; for an idea or script use `create_video`. A video from words needs no footage.

Read `get_profile` when account identity or allowance matters. Use the linked account's actual rights; an unavailable read is unknown, not an empty allowance. Explain verified restrictions. ChatGPT receives no subscription prices, purchase suggestion or checkout link. Other hosts may return the supported Studio billing link.

For a large request, use `dry_run: true` to estimate credits before admission. The user's existing explicit authorization can cover the requested job; obtain a decision when scope or cost materially changes. Creating a video never authorizes posting it.

## Styles and media

Use `browse_styles` for actual ready previews, content/aspect support, saved versions, required inputs and the 21 narrator auditions. Recommend one or two looks with a reason tied to this film: ready Serif Editorial Launch fits type/music launch motion (`inputs.voice: none`); Bold Navy Statement fits narrated statements/explainers (`inputs.voice: narrator`, Chris default). Follow actual catalog metadata and the user's topic/taste. Use returned IDs; private copies remain account-specific. Motion styles are silent by default. When the user wants a voiceover, preserve their chosen visual style and pass the chosen voice; the recorded speech must drive text, pictures and sound timing. Tech can fit a UI demonstration when its sample matches. `copy_style` builds a reusable style from a reference and `adjust_style` changes a saved copy. Preserve the actual returned saved version when chosen; a blocked reference needs its file rather than invented extraction.

Show the completed Clypmint clone preview when available. Honor `preview_source`/`preview_label`: a native/sample preview is Clypmint output; a reference is separate source evidence and must be labeled as such. Select the look from the actual Clypmint preview instead of treating a source reference as its generated result.

With footage, send the complete brief in `edit_video`: purpose, hooks, shorts or clips, formats, speaker spelling, sound_effects, instructions, style and explicitly chosen assets. Use vertical for social and horizontal for YouTube when no shape was specified. Clips and source links are account-gated; use the private upload fallback when the tool says a link is unavailable.

Pass a genuine host-provided attachment descriptor only when the host supports it. Otherwise call `edit_video` without a file and show its private upload link (15 minutes). In a local coding environment, upload the file the user selected with [the upload helper](scripts/upload.mjs): run `node <this skill directory>/scripts/upload.mjs <selected-file> <private-upload-link>`. Resolve the directory from the loaded skill path. Never invent a downloadable attachment or assume access to a whole conversation, local folder or another account. If a link expires, resume the existing upload request and obtain its current link before admitting a new edit.

Read `list_assets` before requesting media the account may already own. Recommend the exact logo, real product screen/photo or identified portrait when it improves the film. Idea-to-video needs no supplied assets; continue with an appropriate text/diagram/web-visual plan when the user has none. Gather a required identity asset only when the user specifically requested it. `import_asset` accepts a supported attachment descriptor or a direct public HTTPS image/song `url` (`logo: true` for the brand mark); its staging key goes in `asset_staging_keys`, while library IDs go in `asset_ids`. Name each supplied file's literal role in instructions. Read [asset gathering and host transport](references/assets-and-hosts.md) when an asset is needed or cannot be attached; honor actual refusals rather than inventing a file URL or substitute person.

## One request, one operation

Choose a stable operation ID for every mutation and preserve the original arguments on retries. Keep import, video, plan and output IDs between calls. A timeout or reconnect resumes the same operation; a deliberate new request gets a new ID. Carry the current version as `base_version` for a creative revision and `expectedEditId` for scheduling. Repeated requests must not consume another edit or create duplicate posts.

## Progress and review

After admission share the Studio project link. Use `get_video_activity` for real stages and useful progress, and `check_video` for the result. Reads never admit another job. Avoid rapid polling; roughly 20–30 seconds is appropriate while an edit is active.

Only `check_video` establishes readiness. During a revision the previous version may remain playable; identify it as the previous cut and wait for the revised version. Repeat a failed video's `problem` and `next_step` accurately. A finished render, playable media and an accepted edit are distinct outcomes.

Show the actual selected output and version, preserve earlier versions, and carry `output_id` for one hook, Short or format. Watch/listen with available host tools or let the user be the audiovisual reviewer through the usable card/Studio link. A ready flag or screenshot does not establish a good voice or mix. Read [review and natural follow-ups](references/review-and-followups.md) before correcting a film. Ask `check_video` with `with_download: true` only when the user requests the file. Signed playback/download URLs stay in the visual card's private metadata.

## Choose the smallest useful change

- Inspect `get_project_context` before referring to scene IDs, word ranges or caption lines.
- Use `fix_captions` for exact words or a spelling replacement. It does not spend a creative round. A two-word mishearing cannot become one caption word; remember the spelling when requested and use a creative revision for this video.
- Use `apply_edits` for supported direct scene, picture, text, caption, word-cut and sound changes. Its operations apply together or return an explicit refusal; do not call a refused edit successful.
- Use `revise_video` for a creative change. Preserve unrelated footage, cuts, graphics and sound. Name `output_id` to change one output. Add captions explicitly when requested on a captionless style; use contain framing when the user asks to preserve the complete portrait.
- For “Use Brian but keep everything else”, inspect actual `check_video.narration.can_change`, audition the selected voice, and send `revise_video` with explicit `voice` plus “Change narrator to Brian. Keep the script and edit.” This supports retained main scratch narration only. Send other visual edits separately; mixed instructions or unsupported source narration are explicitly refused.
- Use `list_versions` and `restore_version` to undo. `get_thread` shows edit history.
- Use `remember`, `list_memory` and `forget` for lasting preferences the user wants retained. A one-off asset swap or voice change is not automatically a global rule.

For voiced faceless films in every style, use the exact approved narration as the visual timeline. On-screen phrases must match the speech during their scene, product actions must appear when described, and sound cues must land on those actions. Use explicit sounds:[] for quiet scenes or a small number of purposeful named scene cues; explicit cues replace automatic effects in that scene. Review real playback for word alignment and a voice-first mix; a ready flag cannot confirm it. Preserve the style's sound defaults and the user's explicit music direction. Do not invent a music request or replace the bed while making an unrelated change. An explicit no-music or no-effects request wins. Keep the exact approved script when `create_video` receives `script`; `idea` permits narration writing. Duration options and narrators come from the current schema. `create_videos` handles up to 10 items with shared defaults and stable per-item operation IDs.

## Content plans and publication

For a month of content, read [the content workflow](references/content-workflows.md). Write concepts, exact scripts and captions in the conversation, then send them as `items` to `plan_content`. This plans only. Show the plan and credit estimate; use `edit_content_plan` for changes. `approve_plan` makes videos and can schedule their publication, so use it only after approval explicitly covers both generation and publication. A review-only batch uses `create_videos` instead.

For existing videos, `schedule_plan` with `approve: false` checks slots without posting. After explicit publication approval, `approve: true` schedules eligible outputs. `get_content_plan` and `list_posts` show outcomes; `post_content_plan` resumes approved slots waiting for connected accounts or a new time.

Publishing requires `clypmint.publish` and connected accounts. Establish the approved output/version, destination account, caption, date and IANA timezone. Obtain the required YouTube audience/visibility and TikTok privacy, interactions, disclosure and sharing choices. `connect_social_accounts` opens an account-owner authorization link when requested. Never expand permissions silently.

Provider-confirmed scheduling, pending acknowledgment, partial delivery and actual publication are separate states. Do not repost successful destinations after a partial failure. Recurring creative work requires a supported host scheduler and an agreed brief, cadence, timezone and budget. A written plan is not an active automation. Default to drafts when publication was not authorized.
