#!/usr/bin/env python3
from __future__ import annotations

import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from xml.etree import ElementTree as ET

REPO_ROOT = Path(__file__).resolve().parent.parent
ROBOTS_PATH = REPO_ROOT / "robots.txt"
SITEMAP_PATH = REPO_ROOT / "sitemap.xml"
BASE_URL = "https://autovalley.ma"

CANDIDATE_ROUTES = [
    ("/", "index.php"),
    ("/services.php", "services.php"),
    ("/apropos.php", "apropos.php"),
    ("/blog.php", "blog.php"),
    ("/article.php", "article.php"),
    ("/contact.php", "contact.php"),
    ("/carrieres.php", "carrieres.php"),
    ("/faq.php", "faq.php"),
    ("/mentions-legales.php", "mentions-legales.php"),
    ("/politique-confidentialite.php", "politique-confidentialite.php"),
]


@dataclass
class RouteEntry:
    loc: str
    source_file: Path
    lastmod: str


def run_git_lastmod(path: Path) -> str:
    result = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", str(path)],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    date = result.stdout.strip()
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        raise RuntimeError(f"Unexpected git date format for {path}: {date!r}")
    return date


def is_indexable(path: Path) -> bool:
    if not path.exists():
        return False

    content = path.read_text(encoding="utf-8")
    robots_match = re.search(r"\$metaRobots\s*=\s*['\"]([^'\"]+)['\"]", content)
    if not robots_match:
        return True

    directives = {directive.strip().lower() for directive in robots_match.group(1).split(",")}
    return "noindex" not in directives


def collect_entries() -> list[RouteEntry]:
    entries: list[RouteEntry] = []

    for route, file_name in CANDIDATE_ROUTES:
        file_path = REPO_ROOT / file_name
        if not is_indexable(file_path):
            continue

        entries.append(
            RouteEntry(
                loc=f"{BASE_URL}{route}",
                source_file=file_path,
                lastmod=run_git_lastmod(file_path),
            )
        )

    return entries


def build_sitemap(entries: list[RouteEntry]) -> ET.ElementTree:
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    urlset = ET.Element("{http://www.sitemaps.org/schemas/sitemap/0.9}urlset")

    for entry in entries:
        url = ET.SubElement(urlset, "{http://www.sitemaps.org/schemas/sitemap/0.9}url")
        loc = ET.SubElement(url, "{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        loc.text = entry.loc

        lastmod = ET.SubElement(url, "{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")
        lastmod.text = entry.lastmod

    return ET.ElementTree(urlset)


def write_sitemap(tree: ET.ElementTree) -> None:
    ET.indent(tree, space="  ")
    tree.write(SITEMAP_PATH, encoding="utf-8", xml_declaration=True)


def read_robots_sitemap_url() -> str:
    content = ROBOTS_PATH.read_text(encoding="utf-8")
    for line in content.splitlines():
        if line.lower().startswith("sitemap:"):
            return line.split(":", 1)[1].strip()
    raise RuntimeError("robots.txt does not declare a Sitemap URL")


def validate_robots_declared_url() -> None:
    declared = read_robots_sitemap_url()
    expected = f"{BASE_URL}/sitemap.xml"
    if declared != expected:
        raise RuntimeError(
            f"robots.txt sitemap URL mismatch. expected={expected!r}, found={declared!r}"
        )


def main() -> None:
    entries = collect_entries()
    tree = build_sitemap(entries)
    write_sitemap(tree)
    validate_robots_declared_url()


if __name__ == "__main__":
    main()
