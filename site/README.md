# Santiago Puig · living CV ("The Core")

The brief is in `CLAUDE.md`. Open facts are in `TODO.md` (generated). Decisions are in `BUILD_LOG.md`. Image and software credits are in `CREDITS.md` (generated).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # validator finds exactly the 9 planted errors
npm run build    # TODOs → credits → privacy check → astro build → cv.pdf + og.png
```

For the demos locally, copy `.dev.vars.example` to `.dev.vars` and add an Anthropic API key.

## Publish to sk1.au (Cloudflare Workers)

One-time setup:

1. In Cloudflare, add the domain `sk1.au` (Free plan) and copy the two nameservers it gives you.
2. In Squarespace → Domains → sk1.au → DNS → Domain Nameservers → *Use custom nameservers*, paste them. Turn DNSSEC off first if it's on.
3. Wait until Cloudflare shows the domain as **Active**.

Each deploy:

```bash
npx wrangler login
PUBLIC_INDEXABLE=true npm run build
npx wrangler deploy
```

Leave out `PUBLIC_INDEXABLE=true` to publish with `noindex` (out of search engines).

The demos' API key goes in as a Worker secret, never in a file:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

`wrangler.jsonc` attaches `sk1.au` and `www.sk1.au` to the Worker on deploy and provisions the KV namespace used for the 10-per-hour rate limit.
