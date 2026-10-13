# Clypmint Agent Plugin

Make and edit videos in ChatGPT, Claude and Codex. Install one plugin to get the Clypmint connection and all four agent skills. Develop the brief in chat, preview the result, ask for changes, and continue the same project in [Clypmint Studio](https://clypmint.com/studio).

## Install

### Claude Code

```text
/plugin marketplace add nuttallp/agent-plugin
/plugin install clypmint@clypmint
```

Use `/mcp` to sign in to your Clypmint account, then start a new session.

### Codex and ChatGPT Work on desktop

```sh
codex plugin marketplace add nuttallp/agent-plugin --ref main
codex plugin add clypmint@clypmint
```

Enable Clypmint in the desktop Plugins page, complete account sign-in, and start a new chat. No separate skill installation is needed. Git marketplace support depends on the host surface; these commands run on your computer, not in a browser-only conversation.

### ChatGPT and Claude in the browser

Use [Clypmint setup](https://clypmint.com/integrations) for your host. The hosted endpoint is `https://clypmint.com/mcp` and uses your Clypmint account's OAuth connection.

A **full plugin** bundles tools and skills. A **custom MCP connection** exposes tools but does not automatically install skills from GitHub. For OpenAI distribution, Clypmint's server supplies the four skills during the developer portal's Scan Tools step; installed plugins receive the reviewed version. Claude distributes the skills and MCP connection together through the Git-hosted plugin bundle. Public directory review and publication are separate from this repository's availability.

## Try it

- “Use Clypmint to edit this video. Show me the styles first.”
- “Make a 30-second vertical video from my approved script.”
- “Turn my podcast into Shorts with complete thoughts.”
- “Make an ad with three hooks, then revise the strongest one.”
- “Plan a month of faceless videos. Show me the concepts before rendering.”

You can ask naturally; installed skills activate automatically when relevant. Idea-to-video needs no footage. When a chat cannot transfer your attachment, Clypmint returns a private upload page. Local agents include an upload helper for the file you choose.

## Included

| Package                            | Contents                                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `chatgpt/`                         | OpenAI submission package: four skills, supporting files, icons and MCP connection |
| `plugins/clypmint-codex/`          | Portable ChatGPT Work/Codex marketplace package                                    |
| `plugins/clypmint/`                | Claude-compatible plugin: skills and remote MCP connection                         |
| `.agents/plugins/marketplace.json` | OpenAI marketplace catalog                                                         |
| `.claude-plugin/marketplace.json`  | Claude marketplace catalog                                                         |

All packages include editing, month-of-faceless-posts, podcast-to-Shorts and three-hook-ad workflows. The editing skill is named `edit-video` on OpenAI and `clypmint-video-editing` on Claude. The plugin identity stays `clypmint` across hosts.

## Updates and troubleshooting

For Codex, run `codex plugin marketplace upgrade clypmint`, update the installed plugin through the desktop Plugins page and start a new chat. In Claude Code, run `/plugin marketplace update clypmint` and `/plugin update clypmint@clypmint`, then start a new session.

If your existing connection only exposes a few actions, use its **Refresh tools list** option and start a new chat. The current server exposes 34 tools, including `create_video`, `plan_content`, `list_assets` and `schedule_plan`. Tool refresh is separate from installing/updating the bundled skills. A missing tool is unavailable; do not assume a skill makes it callable.

## Account and publishing

Your connected Clypmint account's rights and credits apply. Creating or reviewing a video does not authorize posting it. Publishing requires your explicit approval, supported permissions and connected social accounts. A calendar draft, provider-confirmed schedule and published post are distinct states. Recurring creation requires a supported host scheduler; a written plan is not an active automation.

Credentials stay in the host's sign-in flow. The local upload helper accepts a short-lived Clypmint upload link as an explicit argument for the file the user selected. It never reads OAuth credentials, environment variables or saved account files. This temporary upload code is sent to Clypmint’s own service and is omitted from direct signed-storage uploads. Never commit access tokens, private upload links or signed media URLs. The integration files are MIT licensed; hosted service rights are separate.

[Setup and examples](https://clypmint.com/integrations) · [Privacy](https://clypmint.com/legal/privacy) · [Terms](https://clypmint.com/legal/terms) · [Support](mailto:parker@clypmint.com)
