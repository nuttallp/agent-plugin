# Music, action montage and faithful style copies

A reference's music description is not a license, a supplied song, or proof that an unrelated house bed matches it. The rejected house `drive` track is retired. Never choose or regenerate it. Preserve original camera audio unless the user asks to remove it.

## Add or remove music

At creation, import the user's selected audio with `import_asset` and pass its actual `asset_staging_key` as `music_staging_key` to `edit_video` or `create_video`. A file needs a genuine host attachment or a direct HTTPS file URL; never invent one or send a local path. Without that transport, use Studio's Music panel to upload a song. Do not substitute a generic track for a specific requested style. A music-off instruction wins over a style default.

For an existing video, read `get_project_context`, pin the active `base_version` and chosen `output_id`, and use `apply_edits`:

- Remove only added music: `{"op":"music","enabled":false}`. Original speech and camera sound stay.
- Add/replace an owned song: `{"op":"music","enabled":true,"music_staging_key":"<returned key>","level_db":-18}`.
- Beat-sync an existing action montage: add `"beat_sync":true` to that music operation. Only source-shot montages support cut retiming. Clypmint measures the uploaded song, adjusts bounded shot ends without cutting words, and freezes the same song offset for preview/export. Weak evidence, a short song or too few safely alignable cuts returns a failure and preserves the previous version. Do not call a song merely laid under footage beat-synced.

Use one stable operation ID for this change. These are direct edits, not creative revision rounds. Wait for `check_video` to confirm the new version; listen to the result or have the user review it. Sound-effect controls are separate from music. A rendered MP4 mixes audio; never tell the user that deleting an undifferentiated waveform removes only the music. Studio's Music controls render a new version from retained source audio.

## Copy and evaluate a style

Use `copy_style` with the real reference and retain its returned ID. Poll the same request; do not recopy a pending/failed request blindly or spend another style allowance to hide an error. Use `browse_styles` and `adjust_style` for saved copies and their returned previews. A requested copy is account-specific; reference descriptions and IDs are not universal house styles.

Compare the actual reference with the generated sample: shot rhythm and action selection; full-frame/crop treatment; typography and animated devices; transitions; music-driven cuts and deliberate effects. Separate watermarks, usernames and platform end cards from authored captions or graphics. Distinguish original audio from a copied editing method. A ready saved style proves availability, not faithful reproduction; report measured omissions and creative departures clearly. No caption overlays in a reference means do not invent dialogue captions. Action footage must preserve meaningful quiet moves, while removing waiting with actual source cuts.

If no usable song was provided, say the visual edit is unscored. Never claim the source soundtrack was reproduced. Different source footage may not contain the reference's angles or dramatic moments; do not invent them.
