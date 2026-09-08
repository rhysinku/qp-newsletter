import { useBlockProps } from "@wordpress/block-editor";

export default function Save(props) {
  const { attributes } = props;
  const { sponsor_logo_uri, sponsor_name, sponsor_url } = attributes;

  const blockProps = useBlockProps.save({
    className: "mmd-sponsor-banner qp-sponsor-banner flex items-center justify-between p-4 border border-solid rounded-md bg-neutral-light-grey",
  });

  const content = (
    <div className="mmd-sponsor-banner__container flex items-center gap-4">
      {sponsor_logo_uri && (
        <img
          src={sponsor_logo_uri}
          alt={`${sponsor_name} logo`}
          className="mmd-sponsor-banner__logo max-h-12 max-w-[120px] object-contain"
        />
      )}
      <div className="mmd-sponsor-banner__text">
        <span className="mmd-sponsor-banner__label text-xs uppercase block text-neutral-grey-700 tracking-wide">Sponsored By</span>
        <span className="mmd-sponsor-banner__name text-sm font-bold text-system-base">{sponsor_name}</span>
      </div>
    </div>
  );

  if (sponsor_url) {
    return (
      <a href={sponsor_url} target="_blank" rel="noopener noreferrer" {...blockProps}>
        {content}
        <span className="mmd-sponsor-banner__cta text-xs font-bold text-primary-default flex items-center gap-1">
          Visit Partner ↗
        </span>
      </a>
    );
  }

  return (
    <div {...blockProps}>
      {content}
    </div>
  );
}
