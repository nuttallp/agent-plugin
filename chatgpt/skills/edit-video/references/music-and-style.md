# Music and styles

## The user's song

- At creation, the song is a field, never a sentence. In ChatGPT, `import_asset` with the attached `file`; with a public link to the file, `import_asset` with `url`. Either way pass the returned key as `music_staging_key` to `edit_video` or `create_video`.
- No link and no attachment (a song attached in Claude, a file on their computer): `edit_video` with `song_upload: true`. The private upload link then takes the video and the song together.
- A montage with a song plays only the song unless `camera_sound: "keep"`. A talking video keeps the speech and lays the song under it.
- Music but no song of their own ("add some calm background music"): Clypmint lays its own bed, calm or upbeat, from words. At creation `create_video` with `music_bed: true` (say "calm" or "upbeat" in instructions); on a video already made, `revise_video` with "Add a calm music bed under the narration". Never name or fetch a stock song yourself, and never put a house bed where they gave you their own song.

## Change the music of a video already made

One `set_audio` call with `music`:

- Remove added music: `{"on": false}`. The camera sound and speech stay.
- Add or swap a song: `{"on": true, "asset_id": "<from import_media>"}`, or `"music_staging_key"` for a song attached in the chat (`import_asset`); one of Clypmint's own songs: `"track"` (`get_guide` topic `sound` lists them). `gain_db` sets its level, `duck` lowers it under speech.
- Cut a montage to the beat: `revise_video` ("cut it to the beat of the song"). A refusal keeps the video as it was, so say so.

To mute the camera's own sound over chosen seconds: `set_audio` `camera_sound`. These are exact edits, and they are free; `get_screenshot` and `check_video` show the new version. A video with no editable canvas changes its music with `revise_video`.

## Styles

- `browse_styles` lists house styles and the user's saved styles (`own: true`, with `style_version`). Pass the one they name, or a saved style of theirs that fits (`get_profile` `own_styles`), as `style_id`; otherwise leave it out and Clypmint keeps their look.
- `browse_styles` shows the style cards in the chat, so call it only when they ask to see or choose styles, or name one. `get_profile` lists their own saved styles as `own_styles`, with no cards: read it before the first edit.
- `format` says what a style is for: `talking` (someone on camera), `faceless` (a narrated video from words), `motion` (type and music, no narrator unless a `voice` is given).
- `copy_style` makes a new saved style from a reference video link or file; `adjust_style` changes a saved style in plain words for later videos.
- Show a style's preview when the user is choosing. Do not describe a style the catalog does not return.
