import { ReactElement } from 'react';
import { Providers } from '@atlaskit/editor-common/provider-factory';
import { CollabEditProvider } from '@atlaskit/editor-common';

export {
  CollabParticipant,
  CollabEventInitData,
  CollabEventRemoteData,
  CollabEventConnectionData,
  CollabEventPresenceData,
  CollabEventTelepointerData,
  CollabSendableSelection,
} from '@atlaskit/editor-common';

export type InviteToEditComponentProps = {
  children: ReactElement<InviteToEditButtonProps>;
};

export type InviteToEditButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  selected: boolean;
};

export interface CollabInviteToEditProps {
  inviteToEditHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  isInviteToEditButtonSelected?: boolean;
  inviteToEditComponent?: React.ComponentType<InviteToEditComponentProps>;
}

export type CollabEditOptions = {
  provider?: Providers['collabEditProvider'];
  userId?: string;
  useNativePlugin?: boolean;
} & CollabInviteToEditProps;

export type PrivateCollabEditOptions = CollabEditOptions & {
  sanitizePrivateContent?: boolean;
};

export type ProviderCallback = <ReturnType>(
  codeToExecute: (provider: CollabEditProvider) => ReturnType | undefined,
  onError?: (err: Error) => void,
) => Promise<ReturnType | undefined> | undefined;

export type ProviderBuilder = (
  collabEditProviderPromise: Promise<CollabEditProvider>,
) => ProviderCallback;
