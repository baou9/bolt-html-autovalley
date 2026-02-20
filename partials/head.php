<?php
$metaTitle = $metaTitle ?? 'AutoValley';
$metaDescription = $metaDescription ?? '';
$metaRobots = $metaRobots ?? null;
$ogType = $ogType ?? 'website';
$metaImagePath = $metaImagePath ?? '/public/Converted-PNG2.png';
$pageStyles = $pageStyles ?? [];
$headExtra = $headExtra ?? '';

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = strtok($requestUri, '?') ?: '/';

$canonicalUrl = $canonicalUrl ?? sprintf('%s://%s%s', $scheme, $host, $path);
$ogUrl = $ogUrl ?? $canonicalUrl;

if (preg_match('/^https?:\/\//i', $metaImagePath)) {
    $ogImage = $metaImagePath;
} else {
    $ogImage = sprintf('%s://%s%s', $scheme, $host, $metaImagePath);
}
?>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./style/images/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <meta name="description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
<?php if (!empty($metaRobots)): ?>
    <meta name="robots" content="<?= htmlspecialchars($metaRobots, ENT_QUOTES, 'UTF-8') ?>" />
<?php endif; ?>
    <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>" />

    <meta property="og:title" content="<?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:type" content="<?= htmlspecialchars($ogType, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:url" content="<?= htmlspecialchars($ogUrl, ENT_QUOTES, 'UTF-8') ?>" />
    <meta property="og:image" content="<?= htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') ?>" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8') ?>" />
    <meta name="twitter:description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8') ?>" />
    <meta name="twitter:image" content="<?= htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8') ?>" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<?php foreach ($pageStyles as $styleHref): ?>
    <link rel="stylesheet" href="<?= htmlspecialchars($styleHref, ENT_QUOTES, 'UTF-8') ?>">
<?php endforeach; ?>
<?= $headExtra ?>
