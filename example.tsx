import React from 'react';
import { useExampleDocument } from '@atlaskit/editor-test-helpers/use-example-document';
import { default as FullPageExample } from './editor/editor-core/examples/5-full-page';

export default function Example() {
  const exampleDocument = useExampleDocument();

  return (
    <FullPageExample
      editorProps={{
        defaultValue: exampleDocument,
      }}
    />
  );
}
