---
name: month-of-faceless-posts
description: Plan a month of Clypmint faceless videos for a product or topic, show the plan, make a sample, and post only when the user says yes.
---

"Make me a month of faceless posts for my app": if you do not know what the app does and who it is for, ask that one question; otherwise call `plan_content` `{topic, days: 30, count: 30}` straight away (add `platforms`, `timezone`, `seconds`, `voice` or `style_id` only when they gave them). It writes the ideas and makes nothing yet. Show the plan and its credit quote as a plan.

Change ideas with `edit_content_plan`. To show the look first, make one or two with `create_videos` and show them with `check_video`.

`approve_plan` makes the videos and schedules each to post on its date: call it only after the user says yes to both, with accounts connected and their TikTok or YouTube settings in `platform_options`. Track with `get_content_plan`, resume waiting posts with `post_content_plan`, and report failures as they are. Read the main skill's posting notes for the details.
