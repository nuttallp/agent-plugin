# Review the exact version and continue naturally

`check_video` identifies active `version_id`, outputs, readiness and revision state. A previous cut can stay playable while a revision is pending. Name the actual version shown; preserve `output_id` for one hook/Short/format. Signed media remains in card metadata. Watch/listen with available tools or show the supported card/Studio link and let the user be the audiovisual reviewer. A ready flag or screenshot cannot establish voice/mix quality.

Review the opening, each named asset/claim, readable captions, full-body pacing, narrator pronunciation/mix and ending. State concrete technical findings and let the user judge taste. After correction, show the actual new output/version; request download only when wanted.

Read `get_project_context` for real scene IDs, picture keys and caption ranges. Pin active `base_version`; refresh on a version conflict rather than guessing. `get_thread` explains earlier changes; `list_versions`/`restore_version` return the requested prior cut without re-authoring it.

| Follow-up                                | Smallest supported action                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “That's the wrong spelling.”             | `fix_captions` using actual ranges or `replace: [{heard, spelled}]`; timing stays. A spelling swap is also remembered.                                                                                                                                                                |
| “This headline should say X.”            | `apply_edits` `set_text` with the actual scene ID/path.                                                                                                                                                                                                                               |
| “Use that other picture from this film.” | `apply_edits` `swap_picture` with a picture key from this version, not a library ID.                                                                                                                                                                                                  |
| “Use this new logo.”                     | Import it first. A direct picture swap cannot invent a new in-version key; use the supported Studio/creative path if needed. Current `revise_video` has no attachment field, so prose cannot attach it.                                                                               |
| “Make the cards less repetitive.”        | Specific `revise_video` against this version/output, preserving script/source/style unless requested otherwise.                                                                                                                                                                       |
| “Show the whole portrait.”               | Supported exact framing or a creative contain-framing request; retain unrelated beats.                                                                                                                                                                                                |
| “Use Brian; keep everything else.”       | Check actual `narration.can_change`, audition Brian, then explicit `voice: brian` plus “Change narrator to Brian. Keep the script and edit.” in `revise_video`. Main scratch narration only; send other edits separately. This replacement action excludes silent motion and uploaded narration; adding narration to a silent motion film uses the path below. |
| “Undo that.”                             | Select the actual `version_id` from `list_versions`, then `restore_version`.                                                                                                                                                                                                          |

Direct operations are `remove`, `replace_screen`, `set_text`, `swap_picture`, `move`, `add`, `cut_words`, `emphasis`, `captions`, `sound`; read the current schema. They apply together or refuse. Caption-only fixes keep word slots: a two-word utterance cannot become one through this route. Current creation renders after admission; content-calendar approval is a separate generation/publication workflow.

Respond to taste feedback with a concrete scope: “I'll replace the headline on scene 3 and keep the voice and other scenes.” Clarify only genuinely ambiguous changes. A failed small correction does not authorize a fresh film. A one-off portrait/voice swap is not a global preference. “For MetaLog explainers, use calm narration, large type and no bed” can be saved through `remember` when the user wants it retained; `list_memory` avoids duplicates and `forget` removes a retracted rule. `adjust_style` creates a next saved style version; say when that changes later videos.

Receipts can prove the requested API path/script/assets were preserved, not that the user liked the film. Retain pending/failed states honestly, compare the selected versions, and continue within the same project.

## Add a voiceover while keeping a motion style

A style with `inputs.voice: none` remains silent at creation. When the user later wants narration while retaining that look, add it through the same project's `revise_video`; do not switch the style or create a new project. Develop a concise exact voiceover, choose a catalog narrator, pin the active version when the host supports it, and omit the replacement `voice` field. Begin `change` with these two lines, followed by the user's motion and sound instructions:

```text
Narrator: liam
Narration: Snap a photo of your meal and review your calorie and macro estimates.
Keep the editorial typography. Improve the motion and add camera and UI sound effects.
```

The exact script must occupy one line. Addition uses native narration and the music/SFX mixer; its spoken clock is separate from the typography cues. Motion and sound notes can be included in this same round. Preserve the full arguments on retries. A refusal keeps the current film; report it and do not start a replacement video. Check the resulting active version and actual narration, then watch/listen or let the user review it. `narration.can_change: false` after addition means voice-only replacement of this separate clock is not yet supported, not that the film has no voice.
