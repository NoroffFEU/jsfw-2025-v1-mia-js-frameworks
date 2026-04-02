interface HomeContentProps {
  children: React.ReactNode;
}

export default function HomeContent({ children }: HomeContentProps) {
  return (
    <>
      <section
        className="border-b-2 border-(--border) bg-(--bg-card)"
        aria-labelledby="home-heading"
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1
            id="home-heading"
            className="text-3xl font-bold text-(--text) font-heading"

          >
            Loot Locker
          </h1>
          <p className="text-(--text-muted) mt-1">Browse what we have.</p>
        </div>
      </section>
      {children}
    </>
  );
}
