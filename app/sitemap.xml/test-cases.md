# Sitemap URL Generation Test Cases

## Test Cases by Locale

### English (en) - baseUrl: `https://vasion.com`

| Input `story.full_slug` | After Processing | Final URL |
|------------------------|------------------|-----------|
| `home` | `""` | `https://vasion.com` |
| `home/` | `""` | `https://vasion.com` |
| `en/home` | `""` | `https://vasion.com` |
| `en/home/` | `""` | `https://vasion.com` |
| `about` | `about` | `https://vasion.com/about` |
| `about/` | `about` | `https://vasion.com/about` |
| `en/about` | `about` | `https://vasion.com/about` |
| `products/pricing` | `products/pricing` | `https://vasion.com/products/pricing` |
| `products/pricing/` | `products/pricing` | `https://vasion.com/products/pricing` |
| `en/products/pricing` | `products/pricing` | `https://vasion.com/products/pricing` |
| `home/about` | `about` | `https://vasion.com/about` |
| `about/home` | `about` | `https://vasion.com/about` |

### German (de) - baseUrl: `https://vasion.com/de`

| Input `story.full_slug` | After Processing | Final URL |
|------------------------|------------------|-----------|
| `home` | `""` | `https://vasion.com/de` |
| `home/` | `""` | `https://vasion.com/de` |
| `de/home` | `""` | `https://vasion.com/de` |
| `de/home/` | `""` | `https://vasion.com/de` |
| `about` | `about` | `https://vasion.com/de/about` |
| `about/` | `about` | `https://vasion.com/de/about` |
| `de/about` | `about` | `https://vasion.com/de/about` |
| `products/pricing` | `products/pricing` | `https://vasion.com/de/products/pricing` |
| `products/pricing/` | `products/pricing` | `https://vasion.com/de/products/pricing` |
| `de/products/pricing` | `products/pricing` | `https://vasion.com/de/products/pricing` |
| `home/about` | `about` | `https://vasion.com/de/about` |
| `about/home` | `about` | `https://vasion.com/de/about` |

### French (fr) - baseUrl: `https://vasion.com/fr`

| Input `story.full_slug` | After Processing | Final URL |
|------------------------|------------------|-----------|
| `home` | `""` | `https://vasion.com/fr` |
| `home/` | `""` | `https://vasion.com/fr` |
| `fr/home` | `""` | `https://vasion.com/fr` |
| `fr/home/` | `""` | `https://vasion.com/fr` |
| `about` | `about` | `https://vasion.com/fr/about` |
| `about/` | `about` | `https://vasion.com/fr/about` |
| `fr/about` | `about` | `https://vasion.com/fr/about` |
| `products/pricing` | `products/pricing` | `https://vasion.com/fr/products/pricing` |
| `products/pricing/` | `products/pricing` | `https://vasion.com/fr/products/pricing` |
| `fr/products/pricing` | `products/pricing` | `https://vasion.com/fr/products/pricing` |
| `home/about` | `about` | `https://vasion.com/fr/about` |
| `about/home` | `about` | `https://vasion.com/fr/about` |

## Key Behaviors:

1. ✅ **"home" is always stripped** - whether it appears at the beginning or end
2. ✅ **Locale prefix is removed** - `en/`, `de/`, `fr/` prefixes are stripped
3. ✅ **Trailing slashes are removed** - final URLs have no trailing slashes
4. ✅ **Homepage URLs are clean**:
   - English: `https://vasion.com`
   - German: `https://vasion.com/de`
   - French: `https://vasion.com/fr`

## XML Output Example:

For a homepage story with `full_slug = "de/home"` and locale `de`:

```xml
<url>
  <loc>https://vasion.com/de</loc>
  <lastmod>2025-08-11T09:11:09.797Z</lastmod>
</url>
```

For a regular page with `full_slug = "de/about"` and locale `de`:

```xml
<url>
  <loc>https://vasion.com/de/about</loc>
  <lastmod>2025-08-11T09:11:09.797Z</lastmod>
</url>
```

