import type { InfoboxData } from '../types/index'

interface InfoboxProps {
  data: InfoboxData
}

function Infobox({ data }: InfoboxProps) {
  return (
    <aside className="mb-4 w-full overflow-hidden rounded border border-line bg-paper text-sm shadow md:w-64">
      <h2 className="bg-accent px-3 py-1.5 font-semibold text-accent-contrast">
        {data.title}
      </h2>
      {data.imageUrl && (
        <figure className="border-b border-line">
          <img src={data.imageUrl} alt={data.title} className="h-auto w-full" />
          {data.caption && (
            <figcaption className="px-3 py-1 text-xs text-ink-muted">{data.caption}</figcaption>
          )}
        </figure>
      )}
      <dl className="divide-y divide-line">
        {data.fields.map((field) => (
          <div key={field.label} className="px-3 py-1.5">
            <dt className="text-xs font-semibold text-ink-muted">{field.label}</dt>
            <dd className="text-ink">
              {field.href ? (
                <a href={field.href} className="text-accent hover:underline">
                  {field.value}
                </a>
              ) : (
                field.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export default Infobox