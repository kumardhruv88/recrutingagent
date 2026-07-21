export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
