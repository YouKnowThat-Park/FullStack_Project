export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 md:px-10 lg:px-[240px] max-w-screen-xl mx-auto w-full">
      {children}
    </div>
  );
}
