---
name: month-of-faceless-posts
description: Plan a month of Clypmint videos from approved scripts, calibrate the style with drafts, and publish only when the user requests publication.
---

Read the main video-editing skill and its content-workflows reference. Reuse the user's topic, audience, platforms, cadence, timezone and budget. Read actual account rights with `get_profile`; a missing allowance is unknown. Explain a restriction without a purchase pitch in ChatGPT.

Develop the brief and visual plan in the host. Discover actual ready styles/inputs with `browse_styles`: Serif Editorial Launch fits type/music motion without a narrator, Bold Navy Statement fits narrated statements/explainers. Recommend relevant uploads and reuse `list_assets`/`import_asset` IDs/roles; idea-to-video needs no supplied assets. Audition voices only for narration. Preserve actual returned style IDs/versions, factual sources and approved scripts; private IDs do not transfer across accounts.

Write the ideas and exact scripts in conversation, then call `plan_content` with `items` and a stable operation ID. This makes a plan, not videos. Show the calendar and quote; change it with `edit_content_plan`.

For review-only calibration, use `create_videos` for one or two authorized scripts. Check progress and show the results with `check_video`. Save only preferences the user wants remembered. Make the remaining approved drafts in batches of at most 10 with stable operation IDs.

Inspect that calibration's actual chosen voice, readable type and supplied asset use. Let the user review taste before applying it to the rest. Pin accepted output/version; use the smallest supported correction and retain prior versions. A ready flag is not batch-quality approval. An explicit narrator change preserves retained main scratch narration only and is sent separately from other edits.

`approve_plan` also schedules publication. Use it only when authorization explicitly covers generation and publication, connected destination accounts, selected versions, captions, times, timezone and required platform settings. A dry run gives the current estimate. Track every item with `get_content_plan`; use `post_content_plan` to resume approved slots. Do not infer publication from a rendered video or a pending provider receipt.

A recurring task needs a supported host scheduler and a durable brief/ledger with a generation ceiling. A calendar plan is not an active automation.
