# What Clypmint can do

| The user wants                                                                                                    | Tools                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Their footage edited: a montage, a talking video, an ad with hooks, Shorts, a gaming highlight with their facecam | `edit_video`                                                                                                                                                                                                       |
| A long recording cut into clips                                                                                   | `edit_video` with `clips`                                                                                                                                                                                          |
| A video from an idea or exact words, no footage                                                                   | `create_video`, or `create_videos` for up to 10                                                                                                                                                                    |
| A month of posts                                                                                                  | `plan_content`, `edit_content_plan`, `get_content_plan`, `create_videos`; `approve_plan` and `post_content_plan` where posting is open                                                                             |
| Styles                                                                                                            | `browse_styles`, `copy_style`, `adjust_style`                                                                                                                                                                      |
| Their songs and pictures                                                                                          | `import_asset`, `list_assets`                                                                                                                                                                                      |
| Progress and results                                                                                              | `check_video`, `get_video_activity`, `list_videos`                                                                                                                                                                 |
| Changes                                                                                                           | `revise_video`; yourself, free: `get_basic_info`, `get_timeline`, `get_transcript`, `get_screenshot` and the canvas tools; `fix_captions`, `get_project_context`, `get_thread`, `list_versions`, `restore_version` |
| Lasting preferences                                                                                               | `remember`, `list_memory`, `forget`                                                                                                                                                                                |
| Posting (only where posting is open on the account; otherwise these tools are not listed)                         | `get_social_accounts`, `connect_social_accounts`, `schedule_post`, `schedule_plan`, `list_posts`, `update_post`, `cancel_post`                                                                                     |
| The account                                                                                                       | `get_profile`, `get_account_identity`                                                                                                                                                                              |

- A tool that refuses says why and what to send instead. Follow it once; do not retry the same call unchanged.
- Something Clypmint cannot do: say so plainly. Not by chat yet: speed changes, splitting or looping a saved video, copying a reference video's style (use `copy_style`), and finding clips in a long video (use `edit_video` with `clips`). Never promise these.
- For anything else it cannot do: if the host has its own video tools and the user wants it, do it there and say it is separate from the Clypmint project.
- Installed skills can be older than the server. `get_workflow` returns the current guidance; reconnect the connector if a tool in these notes is missing.

## Direct edit tools

Use only tools actually listed by this connection. The canvas tools edit a video with an editable canvas, free and exact (the canvas-editing skill has the loop):

- Read and look: `get_basic_info`, `get_timeline`, `get_transcript`, `get_screenshot`, `get_guide`, `get_font_family_info`, `search_sounds`.
- Bring in: `import_media`.
- Change: `put_overlay`, `write_graphic`, `update_layer`, `delete_layer`, `cut`, `set_captions`, `set_audio`, `set_look`, `add_clip`.

Connections made before November 2026 may list older direct-edit tools instead (scene, element, overlay, caption style, music and shape tools); use them with the IDs `get_project_context` returns. Each change saves a new version; preserve the selected output and check that version before further edits.
