# Posting and monthly plans

Posting is open account by account. When `approve_plan`, `schedule_post` or `schedule_plan` is not in your tool list, posting is not
open on this account: make the videos (`create_videos`), offer the downloads, and say posting is not open yet. Never promise a post.

## A month of posts

1. If you do not know what their product is and who it is for, ask that one question. Otherwise start.
2. `plan_content` `{topic, days: 30, count: 30}` writes the ideas (or send your own `items` with each idea's exact script and caption). It makes nothing yet and answers a credit `quote`. Show the plan as a plan.
3. Changes: `edit_content_plan` `{plan_id, items: [{n, script?, post_at?, removed?}]}`.
4. To see the style first, make one or two with `create_videos` and show them with `check_video`.
5. `approve_plan` makes the videos AND schedules each one to post on its date. Call it only after the user says yes to both, with their accounts connected (`get_social_accounts`, `connect_social_accounts`) and the TikTok or YouTube settings they chose in `platform_options`. `approve_plan` with `dry_run: true` prices the rest. Past the month's room it answers how many fit.
6. `get_content_plan` shows each idea: draft, making, ready, needs_connect, needs_time, scheduled, posted or failed. Say the real counts; never hide failures behind a total. `post_content_plan` resumes posts that waited for an account.

## Posting a video already made

- Making a video never authorizes posting it.
- `schedule_plan` with `approve: false` checks a schedule and changes nothing. Show it. Only after the user says yes, call it again with `approve: true`.
- One video: `schedule_post` with the approved output and version (`expectedEditId`), caption, platforms, time and IANA timezone. Choose the account the user named from `get_social_accounts`; never guess.
- `list_posts` shows the calendar; `update_post` and `cancel_post` change one post. Pending, scheduled, partly posted, failed and posted are different states; never post again to a place that already worked.

## A recurring task

A daily video needs a host scheduler the user approves, a saved brief, a cap on videos per run and a posting rule. Keep each item's IDs and `operation_id` so a retry resumes instead of making a second video. A written plan is not a running automation; say which one you made.
