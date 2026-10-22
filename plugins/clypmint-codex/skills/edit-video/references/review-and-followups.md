# Changes and the canvas

`check_video` names the live `version_id` and each output (main cut, hooks, Shorts, formats). Keep the `output_id` the user means when they change one output.

## The smallest change that does it

| They say | Call |
| --- | --- |
| "make it 30 seconds" / "shorter" | `revise_video` `{change: "Cut it to 30 seconds"}` |
| "make the hook shorter" | `revise_video` with that hook's `output_id` |
| "remove that part / the second explainer" | `get_project_context`, then `apply_edits` `remove` with its `scene_id` |
| "change this headline to X" | `apply_edits` `set_text` with the scene id and path |
| "use the other picture" | `apply_edits` `swap_picture` with a picture key from this version |
| "that word is spelled wrong" | `fix_captions` `{replace: [{heard, spelled}]}`; a swapped name is also remembered |
| "no sound effects" | `apply_edits` `{op: "sound", sound_effects: false}` |
| "swap the song" / "no music" | `apply_edits` music (see music and styles) |
| "use Brian's voice" | `revise_video` with `voice: "brian"` and "Change narrator to Brian. Keep the script and edit." |
| "make it vertical" / "make it square" | `apply_edits` `output_frame` `{ratio: "9:16" or "1:1", fit: "subject"}` reshapes this video; `"contain"` (bars) only when they ask to keep everything in; no canvas: `revise_video` "Make it vertical, 9:16" |
| "a square version too" | `output_frame` with `add: true`: a new output, the original kept (before the next release the answer names today's way: download this one, then reshape) |
| "you cropped it" / "back to the original shape" | `apply_edits` `output_frame` with `frame: null` alone: one call, no new upload |
| "undo" / "the old one was better" | `list_versions`, then `restore_version` |

- `apply_edits` and `fix_captions` are exact and free; several exact changes go in one `apply_edits` call. They apply together or refuse together: report a refusal, never call it done.
- `revise_video` is for changes in words and costs 1 credit (`dry_run: true` says the price). Say timing for one part in words ("a shorter opening"); a number of seconds in a change is read as the whole video's length. Say what you will keep: "I'll shorten the opening and keep the rest."
- Never start a new video or a new upload to change one that exists.
- `get_thread` shows every past change; `remember` keeps a preference for later videos only when the user wants it to last.

## Canvas edits

1. `get_project_context` for the `output_id` returns `canvas`: element IDs, what each can change, coordinate units and the image assets in this version. Follow `canvas.nextOffset` with `element_offset` when present.
2. `layout` moves, scales or rotates an element (copy the values you do not change). `element` changes supported text, colour or hidden. `put_overlay` adds timed text or an image from `canvas.overlayAssets` with `none`, `fade`, `slide` or `pop`; `remove_overlay` removes it. `output_frame` changes the ratio.
3. Send them in ONE `apply_edits` call with `base_version`, `output_id` and an `operation_id`. Read the new version with `check_video`. On a version conflict, read the context again.

If `canvas` is missing, this version has no canvas controls: use `revise_video` or the Studio.
