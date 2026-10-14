# Capability map and host handoff

Read the connected tools' current schemas; this map is workflow guidance, not permission to invent an unavailable tool or bypass account limits. Call `get_workflow` when available for current server-hosted instructions, especially after a reconnect or when an installed skill is old.

| User job | Tools and checks |
| --- | --- |
| Account, credits and existing work | `get_account_identity`, `get_profile`, `list_videos`, `get_thread`, `get_video_activity`, `check_video` |
| Edit supplied footage; ads and alternate openings; long talks into clips | `edit_video`; retain import/project/output IDs and resume the same upload request |
| Faceless content from an idea or exact script | `create_video`, `create_videos`; preserve exact approved scripts and selected narrator |
| Style discovery, reference extraction, saved-copy editing and samples | `browse_styles`, `copy_style`, `adjust_style`; retain returned saved IDs, version and preview status |
| Assets and chosen music | `list_assets`, `import_asset`; real owned IDs and supported transport only |
| Direct editing by Claude's own judgment | `get_project_context` then `apply_edits` for supported scene/canvas/caption/music/sound operations; current IDs and version required |
| Creative changes beyond direct operations | `revise_video`; included rounds apply, keep unrelated choices and earlier versions |
| Transcript corrections | `fix_captions`; preserve word slots; spelling correction is not speech rewriting |
| Undo/version history | `list_versions`, `restore_version` |
| Lasting account preferences | `remember`, `list_memory`, `forget`; only when requested as lasting |
| Plans and batches | `plan_content`, `edit_content_plan`, `get_content_plan`, `approve_plan`, `create_videos` |
| Social connections and posting | `get_social_accounts`, `connect_social_accounts`, `schedule_post`, `list_posts`, `update_post`, `cancel_post`, `schedule_plan`, `post_content_plan`; publishing requires explicit authorization and provider-confirmed receipts |

## Let the host do the creative reasoning

Claude may inspect the actual project and choose exact changes itself. Batch supported operations into one `apply_edits` export rather than spending a Clypmint model round for a simple text, placement, picture, caption, effect or music change. Respect per-version editable capabilities. An unsupported operation must not silently leave a video unchanged while reporting success.

For work outside the exposed Clypmint operations, identify the missing capability. If the host has an actual local/video tool and the user authorized the work, it may obtain the requested download, make an external edit, and show that separate artifact while preserving the Clypmint project. Do not claim that local work updated the dashboard. Returning it to Clypmint requires a supported footage upload and an explicitly scoped new import; it is not an overwrite primitive. A host without file/video tools should explain the exact handoff instead of inventing execution.

## Connector versus installed skills

Remote MCP tools and server-hosted workflow resources update on deployment. Installed Claude/ChatGPT/Codex skill packages are host-managed snapshots and may need refresh/reinstall; a server cannot prove a customer's private host loaded new files. Prefer `get_workflow` for current guidance. If the host caches tool schemas, reconnect/refresh the connector to discover newly added operations. Never claim installation or end-to-end customer use from an OAuth grant or package upload alone.
