export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800/80 text-slate-400 text-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} OPC Store.</p>
      </div>
    </footer>
  );
}
