<?php
$metaTitle = $metaTitle ?? 'AutoValley';
$metaDescription = $metaDescription ?? '';
$metaRobots = $metaRobots ?? null;
$ogType = $ogType ?? 'website';
$metaImagePath = $metaImagePath ?? '/public/Converted-PNG2.png';
$pageStyles = $pageStyles ?? [];
$headExtra = $headExtra ?? '';
$structuredData = $structuredData ?? [];

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = strtok($requestUri, '?') ?: '/';

$canonicalUrl = $canonicalUrl ?? sprintf('%s://%s%s', $scheme, $host, $path);
$ogUrl = $ogUrl ?? $canonicalUrl;

if (!function_exists('av_media_build_url')) {
    function av_media_build_url(string $src, int $width, string $format = 'jpg'): string
    {
        $parts = parse_url($src);
        if (!isset($parts['host']) || !str_contains($parts['host'], 'pexels.com')) {
            return $src;
        }

        $query = [];
        if (!empty($parts['query'])) {
            parse_str($parts['query'], $query);
        }

        $query['auto'] = 'compress';
        $query['cs'] = 'tinysrgb';
        $query['fit'] = 'crop';
        $query['w'] = $width;
        $query['fm'] = $format;

        $base = sprintf('%s://%s%s', $parts['scheme'] ?? 'https', $parts['host'], $parts['path'] ?? '');

        return $base . '?' . http_build_query($query);
    }
}

if (!function_exists('av_responsive_image')) {
    function av_responsive_image(array $config): void
    {
        $src = $config['src'];
        $alt = html_entity_decode($config['alt'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $width = (int) ($config['width'] ?? 1200);
        $height = (int) ($config['height'] ?? 800);
        $class = $config['class'] ?? '';
        $loading = $config['loading'] ?? 'lazy';
        $decoding = $config['decoding'] ?? 'async';
        $sizes = $config['sizes'] ?? '(max-width: 768px) 100vw, 50vw';
        $fetchPriority = $config['fetchpriority'] ?? null;

        $breakpoints = [360, 480, 768, 1200, 1600, 1920];
        $widths = array_values(array_filter($breakpoints, static fn (int $candidate): bool => $candidate < $width));
        $widths[] = $width;
        $widths = array_values(array_unique($widths));

        $buildSrcset = static function (string $format) use ($src, $widths): string {
            $srcsetItems = [];
            foreach ($widths as $responsiveWidth) {
                $srcsetItems[] = av_media_build_url($src, $responsiveWidth, $format) . ' ' . $responsiveWidth . 'w';
            }

            return implode(', ', $srcsetItems);
        };

        $classAttr = $class !== '' ? ' class="' . htmlspecialchars($class, ENT_QUOTES, 'UTF-8') . '"' : '';
        $priorityAttr = $fetchPriority !== null ? ' fetchpriority="' . htmlspecialchars($fetchPriority, ENT_QUOTES, 'UTF-8') . '"' : '';

        echo '<picture>';
        echo '<source type="image/avif" srcset="' . htmlspecialchars($buildSrcset('avif'), ENT_QUOTES, 'UTF-8') . '" sizes="' . htmlspecialchars($sizes, ENT_QUOTES, 'UTF-8') . '">';
        echo '<source type="image/webp" srcset="' . htmlspecialchars($buildSrcset('webp'), ENT_QUOTES, 'UTF-8') . '" sizes="' . htmlspecialchars($sizes, ENT_QUOTES, 'UTF-8') . '">';
        echo '<img width="' . $width . '" height="' . $height . '" src="' . htmlspecialchars(av_media_build_url($src, $width, 'jpg'), ENT_QUOTES, 'UTF-8') . '" alt="' . htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') . '"' . $classAttr . ' loading="' . htmlspecialchars($loading, ENT_QUOTES, 'UTF-8') . '" decoding="' . htmlspecialchars($decoding, ENT_QUOTES, 'UTF-8') . '" sizes="' . htmlspecialchars($sizes, ENT_QUOTES, 'UTF-8') . '" srcset="' . htmlspecialchars($buildSrcset('jpg'), ENT_QUOTES, 'UTF-8') . '"' . $priorityAttr . '>';
        echo '</picture>';
    }
}

if (preg_match('/^https?:\/\//i', $metaImagePath)) {
    $ogImage = $metaImagePath;
} else {
    $ogImage = sprintf('%s://%s%s', $scheme, $host, $metaImagePath);
}

$siteUrl = sprintf('%s://%s', $scheme, $host);

if (!is_array($structuredData)) {
    $structuredData = [];
}

$baseStructuredData = [
    [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'AutoValley',
        'url' => $siteUrl,
    ],
    [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'AutoValley',
        'url' => $siteUrl,
        'logo' => $ogImage,
    ],
];

$allStructuredData = array_merge($baseStructuredData, $structuredData);
?>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="./public/Converted-PNG2.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <meta name="description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
    <meta name="keywords" content="réparation automobile Casablanca, carrosserie Casablanca, diagnostic auto Casablanca, entretien véhicule" />
<?php if (!empty($metaRobots)): ?>
    <meta name="robots" content="<?= htmlspecialchars($metaRobots, ENT_QUOTES, 'UTF-8') ?>" />
<?php endif; ?>
    <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>" />

    <meta property="og:title" content="<?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:type" content="<?= htmlspecialchars($ogType, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:url" content="<?= htmlspecialchars($ogUrl, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:image" content="<?= htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="AutoValley" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?>" />
    <meta name="twitter:description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
    <meta name="twitter:image" content="<?= htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') ?>" />

    <link rel="alternate" hreflang="fr" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<?php foreach ($pageStyles as $styleHref): ?>
    <link rel="stylesheet" href="<?= htmlspecialchars($styleHref, ENT_QUOTES, 'UTF-8') ?>">
<?php endforeach; ?>
<?php foreach ($allStructuredData as $schema): ?>
<?php if (is_array($schema) && !empty($schema)): ?>
    <script type="application/ld+json"><?= json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
<?php endif; ?>
<?php endforeach; ?>
<?= $headExtra ?>
