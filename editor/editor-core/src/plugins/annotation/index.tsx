import React from 'react';
import { annotation } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { stateKey as reactPluginKey } from '../../plugins/base/pm-plugins/react-nodeview';
import { FloatingToolbarConfig } from '../floating-toolbar/types';
import { keymapPlugin } from './pm-plugins/keymap';
import { inlineCommentPlugin } from './pm-plugins/inline-comment';
import {
  AnnotationProviders,
  InlineCommentAnnotationProvider,
  AnnotationInfo,
  AnnotationState,
  InlineCommentState,
  InlineCommentCreateComponentProps,
  InlineCommentViewComponentProps,
  AnnotationTypeProvider,
} from './types';
import { UpdateEvent, AnnotationUpdateEmitter } from './update-provider';
import { getPluginState, inlineCommentPluginKey } from './utils';
import { buildToolbar } from './toolbar';
import { InlineCommentView } from './ui/InlineCommentView';
import { InlineCommentPluginState } from './pm-plugins/types';

const annotationPlugin = (
  annotationProviders?: AnnotationProviders,
): EditorPlugin => {
  return {
    name: 'annotation',

    marks() {
      return [
        {
          name: 'annotation',
          mark: annotation,
        },
      ];
    },

    pmPlugins: () => [
      {
        name: 'annotation',
        plugin: ({ dispatch, portalProviderAPI, eventDispatcher }) => {
          if (annotationProviders) {
            return inlineCommentPlugin({
              dispatch,
              portalProviderAPI,
              eventDispatcher,
              provider: annotationProviders.inlineComment,
            });
          }

          return;
        },
      },
      {
        name: 'annotationKeymap',
        plugin: () => {
          if (annotationProviders) {
            return keymapPlugin();
          }
          return;
        },
      },
    ],

    pluginsOptions: {
      floatingToolbar(state, intl): FloatingToolbarConfig | undefined {
        if (!annotationProviders) {
          return;
        }

        const pluginState = getPluginState(state);
        if (
          pluginState &&
          pluginState.isVisible &&
          !pluginState.bookmark &&
          !pluginState.mouseData.isSelecting
        ) {
          const { isToolbarAbove } = annotationProviders.inlineComment;
          return buildToolbar(state, intl, isToolbarAbove);
        }
      },
    },

    contentComponent({ editorView, dispatchAnalyticsEvent }) {
      if (!annotationProviders) {
        return null;
      }

      return (
        <WithPluginState
          plugins={{
            selectionState: reactPluginKey,
            inlineCommentState: inlineCommentPluginKey,
          }}
          render={(pluginStates: any) => {
            const pluginState: InlineCommentPluginState =
              pluginStates.inlineCommentState;

            if (pluginState && !pluginState.isVisible) {
              return null;
            }

            return (
              <InlineCommentView
                providers={annotationProviders}
                editorView={editorView}
                dispatchAnalyticsEvent={dispatchAnalyticsEvent}
              />
            );
          }}
        />
      );
    },
  };
};

export default annotationPlugin;
export {
  AnnotationProviders,
  InlineCommentAnnotationProvider,
  InlineCommentCreateComponentProps,
  InlineCommentViewComponentProps,
  AnnotationTypeProvider,
  AnnotationInfo,
  AnnotationState,
  InlineCommentState,
  UpdateEvent,
  AnnotationUpdateEmitter,
};
