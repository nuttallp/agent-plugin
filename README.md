# Clypmint for Claude

Create and edit videos through conversation. Claude develops the idea, script and changes; Clypmint shows editing styles, progress, playable video and the content calendar. The same project remains editable in Clypmint Studio.

## Install in Claude Code

```text
/plugin marketplace add nuttallp/clypmint-claude
/plugin install clypmint@clypmint
```

Authenticate the Clypmint connection when prompted. To use the remote tools without the bundled workflow, run:

```sh
claude mcp add --transport http clypmint https://clypmint.com/mcp
```

The plugin includes a Node.js 18+ upload helper for a local video you explicitly select. It uses the private upload link returned by Clypmint; it does not read saved credentials.

## Connect in Claude

Open **Customize → Connectors → Add custom connector** and enter `https://clypmint.com/mcp`. Sign in to your Clypmint account. Existing connections can discover new tools using **More options → Refresh tools list**. Refreshing tools does not grant new publishing permissions.

This repository is the Clypmint-authored integration. Directory submission and Anthropic verification are separate processes; this README does not claim directory approval.

## Try it

- “Show me video editing styles.”
- “Edit this clip with readable captions and fast cuts.”
- “Make a 30-second faceless video from this script.”
- “Make the opening of my latest video faster.”
- “Plan a month of content, then show me the concepts before rendering.”
- “Prepare one video each weekday and save it for review.”

Claude asks for missing decisions in the conversation. Clypmint’s cards show previews and results. Supported footage uses an attachment or a private upload page. Exact-script creation supports 15, 30 and 60 seconds. Shared image/audio transfer depends on host file support; the current direct import accepts OpenAI-provided files up to 32 MiB. It does not access an entire conversation or asset library automatically.

## Scheduling and recurring work

Scheduling requires a publishing-enabled Clypmint account, separate publishing consent and connected social accounts. Availability is currently a limited rollout. A provider-confirmed schedule is distinct from a draft, a pending request or an actual published post.

Recurring creative work runs through the host’s supported scheduler. Claude Code alone does not provide an always-on cloud schedule. Set the creative brief, cadence, timezone, generation limit and publication policy in chat. The workflow keeps an occurrence ledger, reuses operation IDs after interruptions, and reports failures. It never treats a written plan as an active automation. Approved publication appointments continue at the publishing provider after the chat closes.

Editing, style copying and downloads follow the linked account’s existing limits. The plugin does not sell subscriptions or change billing.

## Privacy and support

The server receives explicitly supplied media, editing instructions and selected project/account identifiers. Authorized publishing sends selected media and metadata to Clypmint’s scheduling provider and the connected destination. Credentials stay in the supported account connection flow. Do not commit access tokens, private upload links, signed media URLs or reviewer credentials.

[Privacy policy](https://clypmint.com/legal/privacy) · [Terms](https://clypmint.com/legal/terms) · [Documentation](https://clypmint.com/claude) · [Support](mailto:parker@clypmint.com)

The integration files are MIT licensed. The hosted Clypmint service and its account rights are separate.
