export function TrustedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "Apple",
    "Tesla",
    "OpenAI",
  ];

  return (
    <section className="py-10 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-zinc-500 mb-6">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex space-x-12 animate-scroll overflow-hidden whitespace-nowrap">
          {/* Duplicate list for seamless infinite scroll */}
          {[...companies, ...companies].map((company, index) => (
            <span
              key={`${company}-${index}`}
              className="inline-block text-xl font-bold text-zinc-400 dark:text-zinc-600 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}} />
    </section>
  );
}
