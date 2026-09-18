import { Button, Preview } from "@marameodesign/components";
import Inspector from "./inspector";

import "./editor.scss";

export const Edit = (props) => {
  const { preview } = Preview.get(props);

  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <Inspector {...props} />
          <Button.Edit {...props} />
        </>
      )}
    </>
  );
}
