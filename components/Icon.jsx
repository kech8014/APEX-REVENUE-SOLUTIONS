import * as Icons from "lucide-react";

// Renders a lucide icon by name so content in lib/data.js can stay serializable.
export default function Icon({ name, size = 22, strokeWidth = 1.5, ...rest }) {
  const Cmp = Icons[name] ?? Icons.Circle;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
