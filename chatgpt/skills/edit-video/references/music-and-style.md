# Music and styles

## The user's song

- At creation, the song is a field, never a sentence. In ChatGPT, `import_asset` with the attached `file`; with a public link to the file, `import_asset` with `url`. Either way pass the returned key as `music_staging_key` to `edit_video` or `create_video`.
- No link and no attachment (a song attached in Claude, a file on their computer): `edit_video` with `song_upload: true`. The private upload link then takes the video and the song together.
- A montage with a song plays only the song unless `camera_sound: "keep"`. A talking video keeps the speech and lays the song under it.
- Music but no song of their own ("add some calm background music"): Clypmint lays its own bed, calm or upbeat, from words. At creation `create_video` with `music_bed: true` (say "calm" or "upbeat" in instructions); on a video already made, `revise_video` with "Add a calm music bed under the narration". Never name or fetch a stock song yourself, and never put a house bed where they gave you their own song.

## Change the music of a video already made

Read `get_project_context` for the version, then one `set_video_music` call:

- Remove added music: `{"enabled": false}`. The camera sound and speech stay.
- Add or swap a song: `{"enabled": true, "music_staging_key": "<key from import_asset>", "level_db": -18}`.
- Cut a montage to the beat: add `"beat_sync": true`. It works on montages made of source shots; a refusal keeps the video as it was, so say so.

Volume of the music: `level_db`, or ask `revise_video` ("music quieter"). To mute the camera's own sound over chosen seconds, ask `revise_video`.

These are exact edits, and they are free. `check_video` confirms the new version.

## Styles

- `browse_styles` lists house styles and the user's saved styles (`own: true`, with `style_version`). Pass the one they name as `style_id`; leave it out when they did not choose and Clypmint picks.
- `format` says what a style is for: `talking` (someone on camera), `faceless` (a narrated video from words), `motion` (type and music, no narrator unless a `voice` is given).
- `copy_style` makes a new saved style from a reference video link or file; `adjust_style` changes a saved style in plain words for later videos.
- Show a style's preview when the user is choosing. Do not describe a style the catalog does not return.
