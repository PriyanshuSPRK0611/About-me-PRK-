export function EmptyState({ title, body }: { title: string; body: string }) {
  return (<div className="rounded-control border border-dashed border-line p-8 text-center"><h3 className="text-xl">{title}</h3><p className="mt-2 text-muted">{body}</p></div>);
}
