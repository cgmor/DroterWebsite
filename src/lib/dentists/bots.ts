/**
 * "Only real people": the dentist area answers known AI agents, crawlers,
 * link-preview fetchers, headless browsers and HTTP libraries with a 403
 * before anything else runs. Robots files are only advice; this is enforced.
 */

/** Named AI and crawler agents (matched case-insensitively as substrings). */
const NAMED_AGENTS = [
  // AI training, search and assistant fetchers
  "GPTBot",
  "ChatGPT-User",
  "ChatGPT",
  "OAI-SearchBot",
  "OpenAI",
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "CCBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Google-CloudVertexBot",
  "Gemini-Deep-Research",
  "Bytespider",
  "TikTokSpider",
  "Amazonbot",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "facebookexternalhit",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "DuckAssistBot",
  "YouBot",
  "MistralAI-User",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "PanguBot",
  "PetalBot",
  "Timpibot",
  "ImagesiftBot",
  "Omgilibot",
  "Omgili",
  "Webzio-Extended",
  "iaskspider",
  "img2dataset",
  "Kangaroo Bot",
  "Brightbot",
  "FirecrawlAgent",
  "TavilyBot",
  "Devin",
  "Manus",
  "LinerBot",
  "Andibot",
  "bigsur.ai",
  "Crawlspace",
  "QualifiedBot",
  "VelenPublicWebCrawler",
  "ICC-Crawler",
  "Novellum",
  "FriendlyCrawler",
  "Sidetrade",
  "Factset_spyderbot",
  "Quora-Bot",
  "Scrapy",
  // Search engines, SEO tools, archives
  "Googlebot",
  "bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "archive.org_bot",
  "ia_archiver",
  // Link previews (a text message or chat app unfurling the QR link)
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "TelegramBot",
  "WhatsApp",
  "SkypeUriPreview",
];

/** Generic signs of automation: bots, crawlers, headless browsers, HTTP clients. */
const GENERIC =
  /bot\b|bot\/|crawl|spider|scrap|headless|phantomjs|selenium|webdriver|puppeteer|playwright|python-requests|python-urllib|python\/|aiohttp|httpx|go-http-client|curl\/|wget|libwww|java\/|okhttp|node-fetch|axios\/|undici|http\.rb|guzzlehttp|postmanruntime|insomnia|lighthouse/i;

const NAMED = new RegExp(NAMED_AGENTS.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");

/** True for anything that isn't a person's browser. An empty user agent counts. */
export function isBlockedAgent(userAgent: string | null | undefined): boolean {
  const ua = (userAgent ?? "").trim();
  if (!ua || ua === "node" || ua === "Mozilla/5.0") return true;
  return NAMED.test(ua) || GENERIC.test(ua);
}
