# Daily and monthly content workflow

Use this reference when the person requests recurring generation or a batch of scheduled content. Keep setup in the host conversation, and use Clypmint cards for styles, output review and confirmed publishing receipts.

## Save the brief once

Resolve only missing decisions: brand/audience, source library or exact scripts, style, duration/format, cadence, IANA timezone, per-run generation limit, and review/publication policy. Reuse existing consent and preferences. Default to a proposed draft-only workflow when publication has not been requested; do not silently activate a schedule with unspecified paid usage.

Save the agreed brief and ledger in a host-accessible Page, project file or other authorized durable document. A cloud task cannot rely on a local path or this chat's unsaved working memory. Store IDs and arguments, never credentials, private upload links or expiring media URLs.

Each ledger item holds: plan ID, stable item ID, local occurrence, timezone, concept and exact script, asset IDs, immutable creation arguments and operation ID, video/import ID, selected output/version ID, caption and platform choices, publishing operation ID, provider receipt/status and last checked time. Append each receipt before moving to the next item. If saving fails, stop admitting new items and retain the existing operation ID for recovery.

## Daily generation

First test the exact prompt manually with one authorized item. If the host has a supported cloud scheduler, create its task using the host's scheduling capability and the saved brief/ledger link. The task prompt must include the timezone, generation ceiling, publication policy, required Clypmint tools and recovery instructions. Read back the task's ID, enabled state, cadence and next run. If the host cannot create a schedule, explain the limitation and keep the draft; do not substitute an undocumented local background process.

On each occurrence:

1. Load the brief and ledger, then check account rights and required media. Use the scheduled local date and time, not the retry time, as the occurrence identity. Generate an operation ID of at most 100 ASCII letters, digits, dots, underscores, colons or hyphens, for example `brandA.2026-11-02T0800.item01.create`.
2. If this occurrence already has a video/import ID, call `check_video` and resume it. If admission was uncertain, retry the same tool with the saved operation ID and exactly the same arguments. Do not write a different script under the old ID.
3. For a new occurrence, choose an unused concept from the approved plan; preserve sources for factual claims. Write the exact script in the host and call `create_video` once. Save the acknowledgement before polling. The host does the concept and script work; Clypmint executes the video.
4. Keep a long-running render pending and resume it on a later supported run. Never create a replacement because a task timed out. Do not catch up missed dates by creating several videos unless the saved policy permits that.
5. Show the playable result for review. Schedule only when the user has authorized the exact output and publication details, including platform-specific choices. Use `expectedEditId` and a separate stable publishing operation ID. Reconcile through `list_posts` and retain pending, partial and failed states.

A task that requires interactive permission can pause. Report the real permission boundary rather than claiming unattended success. Do not relax host security settings. After the first real scheduled run, verify one intended output and its saved receipt. A configured task is not proof that an unattended run succeeded.

## Month of content

Plan concepts, captions, dates and destinations first. Show the proposed calendar in chat, clearly labeled as a plan. Produce a small calibration batch, obtain style feedback, then create the remaining authorized items within the saved generation limit. Track all items in the ledger; never hide an incomplete tail of the batch behind a success total.

Render media before handing a publication appointment to the provider. Translate each approved local datetime using its named timezone, explicitly resolving ambiguous or nonexistent daylight-saving times. Read the current connected accounts and pin the approved output/version. Call `schedule_post` once per approved item, preserving each operation ID. Show the visual calendar with `list_posts` only for actual backend receipts.

Changing or pausing the creative task does not automatically cancel provider appointments. On cancellation, list affected scheduled posts, apply only the requested cancellations and verify receipts. Never republish to a destination that already succeeded in a partial delivery.
