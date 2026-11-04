# Changes and the canvas

`check_video` names the live `version_id` and each output (main cut, hooks, Shorts, formats). Keep the `output_id` the user means when they change one output.

## The smallest change that does it

| They say                                        | Call                                                                                                                                                                                                |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "make it 30 seconds" / "shorter"                | `revise_video` `{change: "Cut it to 30 seconds"}`                                                                                                                                                   |
| "make the hook shorter"                         | `revise_video` with that hook's `output_id`                                                                                                                                                         |
| "remove that part / the second explainer"       | `get_timeline`, then `cut` with that part's seconds as `ranges`                                                                                                                                     |
| "change this headline to X"                     | `update_layer` with the layer id from `get_timeline` and the new `text`                                                                                                                             |
| "use the other picture"                         | `update_layer` with `replace_asset_id` (a picture from `get_timeline` media, `list_assets` or `import_media`)                                                                                       |
| "that word is spelled wrong"                    | `fix_captions` `{replace: [{heard, spelled}]}`; a swapped name is also remembered                                                                                                                   |
| "no sound effects"                              | `set_audio` `{house_sounds: {on: false}}`                                                                                                                                                           |
| "swap the song" / "no music"                    | `set_audio` `music` (see music and styles)                                                                                                                                                          |
| "use Brian's voice" (video made from words)     | `revise_video` with `voice: "brian"` and "Change narrator to Brian. Keep the script and edit."                                                                                                      |
| "make it vertical" / "make it square"           | `set_look` `{shape: {ratio: "9:16" or "1:1", fit: "subject"}}` reshapes this video; `"contain"` (bars) only when they ask to keep everything in; no canvas: `revise_video` "Make it vertical, 9:16" |
| "a square version too"                          | `set_look` shape with `add: true`: a new output, the original kept                                                                                                                                  |
| "you cropped it" / "back to the original shape" | `set_look` `{shape: null}` alone: one call, no new upload                                                                                                                                           |
| "undo" / "the old one was better"               | `list_versions`, then `restore_version`                                                                                                                                                             |

- The canvas tools and `fix_captions` are exact and free. Report a refusal; never call it done.
- `revise_video` is for changes and questions in words (cuts, captions, titles, b-roll, motion graphics, sound, music, look, a still camera, a new shape, a style switch, export and share link; for a video made from words, the script, narrator and voiceover). A question about the frames ("is the title covering his face?") changes nothing. It uses credits (`dry_run: true` gives the current price). Say timing for one part in words ("a shorter opening"); a number of seconds in a change is read as the whole video's length. Say what you will keep: "I'll shorten the opening and keep the rest."
- Never start a new video or a new upload to change one that exists.
- `get_thread` shows every past change; `remember` keeps a preference for later videos only when the user wants it to last.

## Canvas edits

1. `get_basic_info` says whether the video has an editable canvas and its `version_id`; `get_timeline` lists its layers (what each can change) and overlays; `get_transcript` its words with numbers and seconds.
2. Look with `get_screenshot` at the seconds you will change. `update_layer` moves, scales, rotates or retimes a layer, or changes its text, colour, visibility or picture. `put_overlay` adds timed text, a picture or a clip; `delete_layer` removes an overlay or hides a layer. `set_captions`, `set_audio` and `set_look` change the captions, the sound and the picture; `cut` takes time out.
3. Pass `base_version` (the `version_id` you read) and `output_id`. Each change saves a new version; look again with `get_screenshot` before the next one. On a version conflict, read again.

If the video has no editable canvas, use `revise_video` or the Studio.
