// Re-mounts on every navigation, giving each page a soft enter transition.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
