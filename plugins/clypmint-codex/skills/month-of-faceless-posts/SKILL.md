---
name: month-of-faceless-posts
description: Plan a month of faceless videos for a product or topic, review the scripts, make an approved sample and batch, and return the videos for review.
---

"Make me a month of faceless posts for my app": if you do not know what the app does and who it is for, ask that one question; otherwise call `plan_content` `{topic, days: 30, count: 30}` straight away (add `platforms`, `timezone`, `seconds`, `voice` or `style_id` only when they gave them). It writes the ideas and makes nothing yet. Show the plan and its credit quote as a plan.

Change ideas with `edit_content_plan`. If the user requested only planning, stop at the plan. When generation is authorized, make one sample, show it with `check_video`, and confirm the look before an expensive batch unless the user already approved it. Use the returned quote and account allowance; make batches of at most 10 with stable per-batch operation IDs. Track every returned video ID and report partial failures without regenerating successful items.

Check the tools exposed by this connection before offering scheduling. If `approve_plan` or publishing tools are absent, make the approved videos with `create_videos`, return playable results and requested downloads, and explain that automatic posting is unavailable. Never call a missing tool or claim that a written calendar is scheduled.

Where `approve_plan` is available, it both makes the videos and schedules each to post: call it only after the user explicitly authorizes both, with destinations, timezone and platform settings confirmed. Do not use it for a request to generate videos only. Track with `get_content_plan`, resume waiting posts with `post_content_plan` when available, and distinguish a provider-confirmed schedule from an actual published post.
