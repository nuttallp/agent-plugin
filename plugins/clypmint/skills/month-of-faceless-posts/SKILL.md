---
name: month-of-faceless-posts
description: Start or feed a faceless Instagram/TikTok/YouTube Shorts account with Clypmint - write a month of video ideas on a topic, make them, and post them after the person approves. Use for "start a faceless account", "a month of posts about X", "post every day about X".
---

1. `get_profile`. If `can_create` is false, give the person `upgrade_url` and stop. Note the credits left.
2. Agree the topic, the audience, how many posts (1-31) over how many days (7-31), the platforms, the length (15/30/60 s), a narrator (`voice`) and the timezone, asking only for what is missing. `browse_styles` if they care about the look.
3. Write the ideas yourself in this conversation: a title, a hook, the exact words the narrator reads (about 2.5 words a second), a caption and a few hashtags each. Then `plan_content { topic, days, items, platforms, timezone, seconds, voice, operation_id }`. It is instant and makes nothing. (Without `items`, send `count` and Clypmint writes them.)
4. Show the calendar as a plan: each idea, its time, and the `quote` (credits a video, room left this month). Change what they ask with `edit_content_plan` (by idea number; `removed: true` drops one).
5. For a review-only calibration, make one or two approved scripts with `create_videos`. Narrate with `get_video_activity`; show them with `check_video`. `approve_plan` also schedules publication, so use it only when the person explicitly approved both generation and publication. Teach only the preferences they want saved with `remember`.
6. `approve_plan { plan_id, dry_run: true }` and say the credits and the room left. Only with their explicit yes: `approve_plan { plan_id }`. Approving needs publishing permission (each video posts on its day once ready); TikTok and YouTube need their settings in `platform_options`, asked from the person. Past the room left it answers how many fit.
7. `get_content_plan` for progress. Ideas that say `needs_connect`: `connect_social_accounts`, then `post_content_plan { plan_id }`.
8. Report every idea: made, still making, scheduled, posted, or failed with its reason.

If the calendar is not available yet (the tool says so): `create_videos` (up to 10 per call, shared `defaults`, one `operation_id` per batch), then `schedule_plan { items, timezone, approve: false }`, show the schedule, and `approve: true` only after their explicit yes.

Never post without the person's yes for that schedule. Keep each `operation_id` on retries so nothing is made twice.
