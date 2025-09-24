# bun-plugin-sveltekit

A Bun plugin to handle SvelteKit-specific imports when running scripts with Bun.

## The Problem

When you have a SvelteKit application and use Bun as your runtime, you often want to run scripts that import (directly or indirectly) SvelteKit-specific modules. For example:

**In your SvelteKit app:**
```javascript
import { GITHUB_TOKEN } from '$env/static/private';
```

**In your Bun CLI scripts:**
```javascript
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
```

This creates a challenge when building shared utility functions that need to work in both environments - the SvelteKit app (requiring special imports) and Bun CLI scripts (using `process.env`).

## The Solution

This plugin allows Bun to resolve SvelteKit's virtual modules, enabling you to use the same imports in both your SvelteKit app and standalone Bun scripts.

## Installation

Download the plugin file directly:

```bash
curl -O https://raw.githubusercontent.com/mquandalle/bun-plugin-sveltekit/main/bun-plugin-sveltekit.ts
```

Then configure your `bunfig.toml` to preload the plugin:

```toml
preload = ["./bun-plugin-sveltekit.ts"]
```

See [Bun's plugin documentation](https://bun.sh/docs/runtime/plugins) for more details on plugin configuration.

## How It Works

The plugin registers handlers for SvelteKit's virtual modules:

- `$env/static/private` → Maps to `Bun.env` (equivalent to `process.env`)
- `$app/environment` → Returns `{ dev: true }`

This allows your scripts to use SvelteKit imports without modification:

```javascript
// This now works in both SvelteKit and Bun CLI scripts!
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';

console.log('Database:', DATABASE_URL);
console.log('Dev mode:', dev);
```

## Current Support

Currently, the plugin only supports:
- `$env/static/private`
- `$app/environment`

It's easy to extend support for other SvelteKit modules by adding more module handlers in the plugin.

## Alternatives

### vite-node

An alternative approach is using [`vite-node`](https://www.sveltepatterns.dev/how-to-access-svelte-specific-api-in-a-script#use-vite-node), which can execute scripts with full Vite transformation pipeline, including SvelteKit's module resolution. This might be a better choice if you need more comprehensive SvelteKit module support.

## Use Cases

- Running database migrations that share models with your SvelteKit app
- Building CLI tools that reuse your application's business logic
- Creating scheduled jobs or background workers
- Testing utilities that depend on SvelteKit modules

## Contributing

Feel free to submit issues or PRs to add support for more SvelteKit modules!

## License

MIT