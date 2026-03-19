interface HomeContentProps {
  children: React.ReactNode;
}

export default function HomeContent({ children }: HomeContentProps) {
  return (
    <main>
      <header className="border-b-2 border-[var(--border)] bg-[var(--bg-card)]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1
            className="text-3xl font-bold text-[var(--text)]"
            style={{ fontFamily: "var(--font-bitter), serif" }}
          >
            Shop
          </h1>
          <p className="text-[var(--text-muted)] mt-1">Browse what we have.</p>
        </div>
      </header>
      {children}
    </main>
  );
}
