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
        <div className="max-w-6xl mx-auto px-4 py-2">
          <h1
            id="home-heading"
            className=" text-(--text-muted) font-bold font-heading"
          >
            Browse what we have to offer
          </h1>
        </div>
      </section>
      {children}
    </>
  );
}
