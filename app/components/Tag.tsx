import hashSum from "hash-sum";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

function hashToColor(title: string) {
  const hash = parseInt(hashSum(title).substring(0, 8), 16);
  const hue = hash % 360;
  const saturation = 60 + (hash % 40);
  const lightness = 30 + (hash % 40);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function Tag({ title }: { title: string }) {
  const color = hashToColor(title);
  return (
    <span
      className={
        " px-2.5 py-1 text-xs rounded-full line-clamp-1 tag" +
        (colord(color).luminance() < 0.55
          ? " text-background-50 "
          : " text-background-900 ")
      }
      style={{ backgroundColor: color }}
    >
      {title}
    </span>
  );
}
