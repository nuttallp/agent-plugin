---
name: ad-with-three-hooks
description: Edit real footage into a Clypmint ad with three opening hooks and the shapes it needs, then change the one the user picks.
---

"Make an ad with three hooks": call `edit_video` with `purpose: "ad"` (three hooks by default; `hooks` 1-3 to choose) in your first reply. Put their shapes in `formats` (the main one first), a length in `length`, a style they named in `style_id`, the speaker's name in `speaker_name`, and only the rest of what they said (the offer, the call to action) in `instructions`, in their words.

Attach the footage in ChatGPT; elsewhere give the user the private upload link from the answer.

`check_video` lists the main cut and each hook as outputs. Show them. A change to one hook is `revise_video` with that hook's `output_id`; exact fixes are `apply_edits` and `fix_captions`. Making an ad never authorizes running or posting it.
