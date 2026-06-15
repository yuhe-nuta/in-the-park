#!/usr/bin/env python3
"""人物切り抜きツール

入力画像から人物だけを切り抜き、指定した背景色（既定 #E8392A）に合成して
PNG として保存する。出力先は既定で src/assets。

使い方:
  # 単体
  inp/bin/python scripts/cutout.py テラダ.jpg terada.png

  # 背景色を指定（#つきでも無しでも可）
  inp/bin/python scripts/cutout.py 入力.jpg 出力.png --bg E8392A

  # 出力先を変更
  inp/bin/python scripts/cutout.py 入力.jpg 出力.png --outdir public

  # 透過のまま（背景を合成しない）
  inp/bin/python scripts/cutout.py 入力.jpg 出力.png --transparent

依存: rembg, Pillow（venv `inp` に導入済み）。
初回実行時は rembg がモデルを自動ダウンロードする。
"""

from __future__ import annotations

import argparse
import os
import sys

from PIL import Image
from rembg import remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_BG = "E8392A"
DEFAULT_OUTDIR = os.path.join("src", "assets")


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    if len(value) != 6:
        raise argparse.ArgumentTypeError(f"無効なカラーコード: {value}")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def cutout(src: str, dst: str, bg: str | None, outdir: str) -> None:
    src_path = src if os.path.isabs(src) else os.path.join(ROOT, src)
    if not os.path.exists(src_path):
        sys.exit(f"入力が見つかりません: {src_path}")

    out_dir = outdir if os.path.isabs(outdir) else os.path.join(ROOT, outdir)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, dst)

    img = Image.open(src_path).convert("RGBA")
    cut = remove(img)  # 透過背景の人物

    if bg is None:
        cut.save(out_path, "PNG")
        result = cut
    else:
        canvas = Image.new("RGBA", cut.size, hex_to_rgb(bg) + (255,))
        canvas.alpha_composite(cut)
        result = canvas.convert("RGB")
        result.save(out_path, "PNG")

    print(f"wrote {out_path} {result.size}")


def main() -> None:
    p = argparse.ArgumentParser(description="人物を切り抜いて背景色に合成する")
    p.add_argument("src", help="入力画像（プロジェクトルートからの相対パスまたは絶対パス）")
    p.add_argument("dst", help="出力ファイル名（例: terada.png）")
    p.add_argument("--bg", default=DEFAULT_BG, help=f"背景色 hex（既定: {DEFAULT_BG}）")
    p.add_argument("--outdir", default=DEFAULT_OUTDIR, help=f"出力ディレクトリ（既定: {DEFAULT_OUTDIR}）")
    p.add_argument("--transparent", action="store_true", help="背景を合成せず透過のまま保存")
    args = p.parse_args()

    cutout(args.src, args.dst, None if args.transparent else args.bg, args.outdir)


if __name__ == "__main__":
    main()
