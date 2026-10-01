"use client";
import { Button } from "./Button";
export function ErrorState({ title, retryLabel, onRetry }: { title: string; retryLabel: string; onRetry: () => void }) {
  return (<div role="alert" className="rounded-control border border-danger p-8 text-center"><h3 className="text-xl text-danger">{title}</h3><Button className="mt-4" onClick={onRetry}>{retryLabel}</Button></div>);
}
