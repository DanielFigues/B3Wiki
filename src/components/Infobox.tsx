import type { InfoboxData } from '../types/index'

interface InfoboxProps {
  data: InfoboxData
}

function Infobox({ data }: InfoboxProps) {
  return (
    <aside className="infobox">
      <h3 className="infobox-title">{data.title}</h3>
      {data.imageUrl && (
        <figure className="infobox-image">
          <img src={data.imageUrl} alt={data.title} />
          {data.caption && <figcaption>{data.caption}</figcaption>}
        </figure>
      )}
      <dl className="infobox-fields">
        {data.fields.map((field) => (
          <div key={field.label} className="infobox-field">
            <dt>{field.label}</dt>
            <dd>
              {field.href ? <a href={field.href}>{field.value}</a> : field.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export default Infobox
