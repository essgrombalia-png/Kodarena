import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface AppErrorBoundaryProps {
  children?: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  declare readonly props: AppErrorBoundaryProps;
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Kodarena rendering error:', error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070a12] p-6 text-slate-100">
        <section className="premium-panel w-full max-w-md rounded-3xl p-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-black text-white">Något gick fel</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Appen kunde inte rita klart den här vyn. Ladda om sidan och försök igen.</p>
          <button onClick={this.handleReload} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-amber-300">
            <RefreshCw className="h-3.5 w-3.5" />
            Ladda om appen
          </button>
        </section>
      </main>
    );
  }
}
