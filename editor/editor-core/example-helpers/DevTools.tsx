import React from 'react';
import { WithEditorActions } from '@atlaskit/editor-core';

export function DevTools() {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const workerFile = require('worker-plugin/loader!prosemirror-dev-tools/json-diff.worker');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const diffWorker = React.useMemo(
      () =>
        typeof Worker === 'undefined' ? undefined : new Worker(workerFile),
      [workerFile],
    );

    return (
      <WithEditorActions
        render={actions => {
          const editorView = actions._privateGetEditorView();
          if (editorView) {
            import('prosemirror-dev-tools').then(({ applyDevTools }) =>
              applyDevTools(editorView, {
                diffWorker,
              }),
            );
          }
          return null;
        }}
      />
    );
  }

  return null;
}
