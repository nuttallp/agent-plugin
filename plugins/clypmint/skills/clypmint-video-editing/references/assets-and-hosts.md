# Gather the exact required media

Read `list_assets` first and retain real account-owned IDs. Build a small role map: logo, product screen/photo and named person's portrait. Request only required missing files, preserving their identity/source/reuse limits. A file in another conversation/account or a local path is not automatically in this library.

Supplied assets are optional for an idea-to-video request. Recommend an upload when it makes the brand/product/person more faithful, but continue with an appropriate asset-free visual plan when the user has none. Only an explicitly required exact logo/portrait/product image creates a dependency on that particular file; do not block every new idea on brand setup.

`import_asset` accepts exactly one source: a genuine supported OpenAI host descriptor `file: {file_id, download_url, mime_type, file_name}`, or `url` containing a direct public HTTPS link to the image or song. Include a stable `operation_id`; use `logo: true` for the actual brand mark and optional `file_name` to name it. Supported bytes are PNG, JPEG, WebP, GIF, MP3, WAV or M4A, up to 32 MiB. A web page containing an image, SVG, video, private share page or local path is not a supported image/audio source.

Public URL imports check every resolved address and redirect, reject private networks, credentials and nonstandard ports, pin the connection to a validated address, and verify file type from its bytes. Send the real direct file URL; do not work around a refusal with an invented public bucket or altered credentials. If the exact file is private, use existing account assets, a supported attachment or the returned Studio Brand upload page.

Use its `asset_staging_key` in `asset_staging_keys`; existing `src_...` IDs from `list_assets` belong in `asset_ids`. A song's staging key belongs in `music_staging_key`. Raw URLs belong only in the import source. Explain each file's role in `instructions`; verify that role in the actual rendered scene.

## Transport by host

- **ChatGPT:** pass a real attachment descriptor only when the current host supplies one usable by this tool. A visible attachment is not permission to invent `download_url`. File-library helpers can be used only when the actual widget implements them. A cloud-only chat cannot read a local Mac path.
- **Claude chat:** use `import_asset` with `url` for the actual public HTTPS image/song link, plus `logo: true` when appropriate. If the attachment is private and cannot be passed, reuse `list_assets` or the returned Brand upload page. The connector does not see every conversation file automatically.
- **Claude Code/Codex local files:** the packaged `scripts/upload.mjs` uploads the exact selected footage to the private link from `edit_video`. Resolve it from the loaded skill directory. It does not solve logo/image import; those need the supported descriptor, an actual public HTTPS file URL, an existing library asset or the Brand page. Do not expose private files through an invented public bucket as a workaround.
- **Other MCP/API hosts:** follow the actual descriptor/link schema and returned IDs. OAuth identifies the linked account; a profile label does not grant another account's media.

Footage is separate: `edit_video` accepts a supported video descriptor, an allowed public `source_url`, or no file to obtain a private upload link valid for 15 minutes. For a local selected video run `node <loaded-skill-directory>/scripts/upload.mjs <selected-video> <returned-private-upload-link>`. If a link expires, resume that request and get its current link; do not admit another edit. `create_video` from words needs no footage.

On refusal provide one actionable alternative from the tool: a supported attachment, compatible file, existing library asset or Brand page. Keep retries/source/role/operation ID stable. A deliberately replaced source gets a new ID. Do not repeatedly ask the user to resend the same inaccessible attachment.

For a named person's portrait, retain the approved identity/source. If only a name was supplied, use available authoritative image search or ask for their exact portrait; check identity before use. A book cover is not its author's portrait. Preserve rights/reuse constraints supplied with assets. Save role, original source and returned asset/staging ID in the project brief; keep credentials/private upload links/expiring signed URLs out of durable memory.
