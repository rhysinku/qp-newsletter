import ServerSideRender from "@wordpress/server-side-render";

import { Preview } from "@marameodesign/components";
import Inspector from "./inspector";

const EmptyResponsePlaceholder = () => <h3>No results...</h3>;
const ErrorResponsePlaceholder = () => <h3>Error has occurred...</h3>;
const LoadingResponsePlaceholder = () => <h3>Loading...</h3>;

export const Edit = (props) => {
  const { attributes, name } = props;
  const { preview } = Preview.get(props);

  if (preview) return <Preview.Content {...props} />;

  return (
    <>
      <Inspector {...props} />
      <ServerSideRender
        block={name}
        attributes={attributes}
        EmptyResponsePlaceholder={EmptyResponsePlaceholder}
        ErrorResponsePlaceholder={ErrorResponsePlaceholder}
        LoadingResponsePlaceholder={LoadingResponsePlaceholder}
      />
    </>
  );
};
