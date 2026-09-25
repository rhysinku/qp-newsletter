import ServerSideRender from "@wordpress/server-side-render";
import { Preview } from "@marameodesign/components";
import Inspector from "./inspector";

const EmptyResponsePlaceholder = () => (
  <div className="p-8 text-center bg-neutral-100 rounded-2xl border border-neutral-200">
    <p className="text-neutral-600 font-bold">No posts found matching the query criteria.</p>
  </div>
);

const ErrorResponsePlaceholder = () => (
  <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-200">
    <p className="font-bold">Error rendering Dynamic Filter block preview.</p>
  </div>
);

const LoadingResponsePlaceholder = () => (
  <div className="p-8 text-center bg-neutral-100 rounded-2xl border border-neutral-200 animate-pulse">
    <p className="text-neutral-500 font-medium">Loading Dynamic Filter listing preview...</p>
  </div>
);

export const Edit = (props) => {
  const { attributes, name } = props;
  const { preview } = Preview.get(props);

  if (preview) {
    return <Preview.Content {...props} />;
  }

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
