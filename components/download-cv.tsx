import { Download } from 'lucide-react';

export function DownloadCV() {
  return (
    <div className="not-prose mt-10 flex justify-center">
      <a
        href="/cv-peter-vargas.pdf"
        download="CV - Peter Vargas.pdf"
        className="inline-flex items-center gap-2 rounded-lg border bg-fd-card px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        <Download className="size-4" />
        Descargar mi CV
      </a>
    </div>
  );
}
