interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
        Mock data — add GHL API key to go live
      </div>
    </div>
  )
}
