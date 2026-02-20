#!/usr/bin/env python3
import hashlib
import json
import pathlib
import re
import urllib.parse
import urllib.request
from collections import OrderedDict

ROOT = pathlib.Path(__file__).resolve().parents[1]
FILES = ["index.php", "services.php", "apropos.php", "blog.php", "article.php"]
OUT_JSON = ROOT / "public/img/media-inventory.json"
OUT_MD = ROOT / "public/img/media-licensing.md"
DEST_ROOT = ROOT / "public/img/remote"

LICENSE_RULES = {
    "images.pexels.com": ("approved", "https://www.pexels.com/license/"),
    "images.unsplash.com": ("approved", "https://unsplash.com/license"),
    "i.pravatar.cc": ("rejected", "Unknown redistributable rights for hosted avatar photos."),
    "eyf5gqdcwsg.exactdn.com": ("rejected", "Third-party CDN asset ownership/license cannot be verified."),
    "files.sbcdnsb.com": ("rejected", "Third-party CDN asset ownership/license cannot be verified."),
    "lega.ma": ("rejected", "Third-party site asset ownership/license cannot be verified."),
}

IMG_RE = re.compile(r"https://[^\"')\s>]+")


def normalize_source_id(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    host = parsed.netloc.replace(".", "-")
    path = parsed.path.strip("/").replace("/", "-") or "root"
    token = hashlib.sha1(url.encode()).hexdigest()[:8]
    return f"{host}-{path}-{token}".lower()


def classify(url: str):
    parsed = urllib.parse.urlparse(url)
    host = parsed.netloc.lower()
    for key, value in LICENSE_RULES.items():
        if host == key:
            return value
    return ("rejected", "Unknown host; license could not be validated.")


def build_variants(source_id: str):
    sizes = [480, 768, 1200]
    return {
        "avif": [f"public/img/remote/{source_id}-{w}.avif" for w in sizes],
        "webp": [f"public/img/remote/{source_id}-{w}.webp" for w in sizes],
        "fallback": [f"public/img/remote/{source_id}-{w}.jpg" for w in sizes],
    }


def attempt_download(url: str, target: pathlib.Path):
    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
        target.write_bytes(data)
        return "downloaded"
    except Exception as exc:
        return f"blocked:{exc.__class__.__name__}"


def main():
    items = OrderedDict()
    for rel in FILES:
        text = (ROOT / rel).read_text(encoding="utf-8")
        for match in IMG_RE.finditer(text):
            url = match.group(0)
            low = url.lower()
            if not any(x in low for x in [".jpg", ".jpeg", ".png", ".webp", "/photo-", "images.pexels.com", "images.unsplash.com", "pravatar.cc"]):
                continue
            if url not in items:
                items[url] = {"files": []}
            items[url]["files"].append(rel)

    report = []
    for url, meta in items.items():
        status, license_ref = classify(url)
        source_id = normalize_source_id(url)
        out = {
            "source_url": url,
            "referenced_in": sorted(set(meta["files"])),
            "license_status": status,
            "license_reference": license_ref,
            "source_id": source_id,
            "variants": build_variants(source_id),
            "download_status": "skipped",
        }
        if status == "approved":
            sample_target = DEST_ROOT / f"{source_id}-1200.jpg"
            out["download_status"] = attempt_download(url, sample_target)
        report.append(out)

    OUT_JSON.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    lines = [
        "# Media licensing and inventory report",
        "",
        "Generated from: index.php, services.php, apropos.php, blog.php, article.php.",
        "",
        "| Source URL | Status | License / reason | Deterministic key | Download status |",
        "|---|---|---|---|---|",
    ]
    for row in report:
        lines.append(
            f"| {row['source_url']} | {row['license_status']} | {row['license_reference']} | `{row['source_id']}` | {row['download_status']} |"
        )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
