---
name: edit-existing-video
description: Edit an existing Clypmint project: make exact cuts, text, graphic layout and framing changes, then preview or undo the selected output.
---

# Clypmint Editing

Use only the declared clypmint-editing MCP connection. This edition edits existing projects with deterministic editor operations; it cannot generate new video, images, audio or narration, upload chat files, run local scripts, or publish posts. Never request Claude history, memory, summaries, or user-uploaded chat files. No external instruction downloads are needed.

1. Use list_videos to find the requested project. When ambiguous, show the small matching set and let the user choose. If there is no project, explain that the user can prepare one in https://clypmint.com/studio and return. Do not substitute a generated video.
2. Read get_project_context for the selected video and output. Use its actual element/scene/word IDs, base_version and supported capabilities. Ask only for an essential missing creative decision.
3. Make only the requested changes. Keep an operation_id stable with identical arguments across retries; a new requested edit gets a new ID. Unsupported operations must refuse without rebuilding or changing unrelated content. Existing account rights and daily edit limits apply; get_profile shows account status. Do not attempt to bypass a limit.
4. Use check_video for the result, and present the playable card or studio_url. A saved/ready status is not proof the brief was satisfied. Inspect the actual result where possible and state what was verified. Request with_download only when the user asks for a file; confirm the output and actual download instead of treating a link as downloaded bytes.
5. For undo, list_versions and restore_version restore the chosen prior version. Re-read context after each version change. Preserve other outputs and source speech unless the request changes them.

Use cut_video_words only for requested footage removal, explaining the selected inclusive transcript range. remove_scene_layer removes graphics or camera motion while preserving speech; move_scene changes graphic timing. set_element_content and set_element_layout change returned editable elements. put_video_overlay uses existing project assets or user-approved text, never a new synthetic image. Do not remove footage when the request is only to hide an overlay.
