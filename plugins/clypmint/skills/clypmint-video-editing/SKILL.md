---
name: clypmint-video-editing
description: Create or edit Clypmint videos, copy editing styles, review visual results, plan a content calendar, or set up recurring video drafts through the host scheduler.
---

Pick a style with `browse_styles`, or let Clypmint pick one.

Call `edit_video` with the file when this chat can attach it. If it cannot, call `edit_video` without a file and give the person the private upload link it returns.

In Claude Code, when the person has a local file, upload it with the bundled script:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/clypmint-video-editing/scripts/upload.mjs" ./video.mp4 'https://clypmint.com/send#hof_...'
```

Check progress with `check_video` every 20 to 30 seconds. Never say the video is ready before `check_video` says it is ready. Then show the playable result and its authorized download control. Keep signed media URLs in the visual card, not in the conversation.

Use `revise_video` for changes. Use `copy_style` when the person gives a reference video link.

## Conversation and visuals

The host assistant owns the conversation. Develop concepts, scripts, captions and schedules with the person here. Ask only for missing decisions; reuse what they already told you. Clypmint cards show style previews, media, progress and publishing receipts. Do not send people to a separate creative questionnaire.

Use `create_video` for a faceless video: send the exact approved script, duration, style and instructions. Its verbatim mode preserves the script. `list_assets` returns available media IDs; `import_asset` accepts an explicitly shared ChatGPT image or audio file up to 32 MiB, with a seven-day staging window. A host without supported file parameters must use the existing upload/Studio path; never fabricate a downloadable attachment or assume access to another conversation. Use `get_project_context` before a precise revision.

## Scheduling

Read `get_social_accounts`. If the person requests connecting a missing account, use `connect_social_accounts` and give them its private link. Before `schedule_post`, establish the approved video/output/version, caption, destination accounts, time and IANA timezone. Obtain explicit YouTube visibility/audience choices and TikTok visibility, interaction, AI/brand disclosure and sharing consent. Never invent permission, privacy choices or account capabilities. Platform rules still apply.

Carry the current `version_id` from `check_video` as `expectedEditId`. Preserve `operationId` on retries. A repeated occurrence must reuse its original identity, even after a timeout. For a month of content, schedule each approved item and then show `list_posts`; report pending/failed items individually. A pending provider acknowledgement is not a scheduled post. Partial delivery must never trigger republication to successful destinations.

For a daily host automation, first verify that the host supports scheduled execution of this connector with the required permissions. Create the host task only after the person sets cadence, timezone, creative brief, spending limits and publication policy. Use automation ID plus occurrence date for video and post operation IDs. Default to preparing a reviewable video when publication has not been authorized. The Clypmint tools do not themselves create a host task, and a suggested recurring workflow is not an active automation. Already-confirmed scheduled posts execute at the provider without the conversation remaining open.

For recurring generation or a month of content, read [Daily and monthly content workflow](references/content-workflows.md). It defines the durable brief, occurrence ledger, host task setup, recovery and batch review.
