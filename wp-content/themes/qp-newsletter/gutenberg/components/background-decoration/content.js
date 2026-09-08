import _ from 'lodash';


export default function Content(props) {
  const { backgroundDecoration } = props.attributes;
  if (!backgroundDecoration || _.isEmpty(backgroundDecoration)) {
    return null;
  }

  if (backgroundDecoration === "ribbon-right") {
    return (
      <figure className="bg-decor-right absolute top-0 right-0 -z-10" aria-hidden="true">
        <img
          src="/wp-content/themes/qp-newsletter/assets/images/icons/right-bg-decor.svg"
          alt="Decoration image"
          decoding="async"
        />
      </figure>
    );
  }
  else if (backgroundDecoration === "ribbon-top-right") {
    return (
      <figure className="bg-decor-top-right absolute top-0 right-0 -z-10" aria-hidden="true">
        <img
          src="/wp-content/themes/qp-newsletter/assets/images/icons/top-right-bg-decor.svg"
          alt="Decoration image"
          decoding="async"
          />
      </figure>
    );
  }
  else { // ribbon-top-hero
    return (
      <figure className="bg-decor-top-right absolute top-0 right-[15%] -z-10" aria-hidden="true">
        <img
          src="/wp-content/themes/qp-newsletter/assets/images/icons/hero-decor-top.svg"
          alt="Decoration image"
          decoding="async"
          />
      </figure>
    );
  }
}
