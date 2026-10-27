# What Clypmint can do

| The user wants                                                                                                    | Tools                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Their footage edited: a montage, a talking video, an ad with hooks, Shorts, a gaming highlight with their facecam | `edit_video`                                                                                                                           |
| A long recording cut into clips                                                                                   | `edit_video` with `clips`                                                                                                              |
| A video from an idea or exact words, no footage                                                                   | `create_video`, or `create_videos` for up to 10                                                                                        |
| A month of posts                                                                                                  | `plan_content`, `edit_content_plan`, `get_content_plan`, `create_videos`; `approve_plan` and `post_content_plan` where posting is open |
| Styles                                                                                                            | `browse_styles`, `copy_style`, `adjust_style`                                                                                          |
| Their songs and pictures                                                                                          | `import_asset`, `list_assets`                                                                                                          |
| Progress and results                                                                                              | `check_video`, `get_video_activity`, `list_videos`                                                                                     |
| Changes                                                                                                           | `revise_video`, `apply_edits`, `fix_captions`, `get_project_context`, `get_thread`, `list_versions`, `restore_version`                 |
| Lasting preferences                                                                                               | `remember`, `list_memory`, `forget`                                                                                                    |
| Posting (only where posting is open on the account; otherwise these tools are not listed)                         | `get_social_accounts`, `connect_social_accounts`, `schedule_post`, `schedule_plan`, `list_posts`, `update_post`, `cancel_post`         |
| The account                                                                                                       | `get_profile`, `get_account_identity`                                                                                                  |

- A tool that refuses says why and what to send instead. Follow it once; do not retry the same call unchanged.
- Something Clypmint cannot do: say so plainly. Not by chat yet: speed changes, splitting or looping a saved video, copying a reference video's style (use `copy_style`), and finding clips in a long video (use `edit_video` with `clips`). Never promise these.
- For anything else it cannot do: if the host has its own video tools and the user wants it, do it there and say it is separate from the Clypmint project.
- Installed skills can be older than the server. `get_workflow` returns the current guidance; reconnect the connector if a tool in these notes is missing.

## Direct edit tools

Use only tools actually listed by this connection. `apply_edits` is the older batch compatibility interface; current connections expose each operation separately:

- `remove_scene`, `remove_scene_layer`, `replace_scene_screen`, `set_scene_text`, `swap_scene_picture`, `move_scene`, `add_scene`, `cut_video_words`.
- `set_word_emphasis`, `set_caption_style`, `set_video_music`, `set_video_sound_effects`, `set_scene_sounds`.
- `set_output_frame`, `put_video_overlay`, `remove_video_overlay`, `set_element_layout`, `set_element_content`.

Read `get_project_context` for actual IDs and capabilities, then use the selected tool schema. Each saves a new version; preserve the selected output and check that version before further edits.
