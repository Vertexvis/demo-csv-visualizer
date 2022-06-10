import { useRouter } from 'next/router';
import React from 'react';

import { Configuration } from '../lib/config';
import { Metadata, toMetadata } from '../lib/metadata';
import { selectByHit } from '../lib/scene-items';
import { useViewer } from '../lib/viewer';
import { Header } from './Header';
import { Layout, RightDrawerWidth } from './Layout';
import { RightDrawer } from './RightDrawer';
import { Viewer } from './Viewer';

export interface Props {
  readonly config: Configuration;
  readonly streamKey: string;
}

export function Home({ streamKey, config: { network } }: Props): JSX.Element {
  const router = useRouter();
  const viewer = useViewer();
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();

  return router.isReady ? (
    <Layout
      header={<Header />}
      main={
        viewer.isReady && (
          <Viewer
            config={JSON.stringify({ network, flags: { logWsMessages: true } })}
            streamKey={streamKey}
            onSelect={async (hit) => {
              console.debug({
                hitNormal: hit?.hitNormal,
                hitPoint: hit?.hitPoint,
                sceneItemId: hit?.itemId?.hex,
                sceneItemSuppliedId: hit?.itemSuppliedId?.value,
              });
              await selectByHit({
                deselectItemId: metadata?.itemId,
                hit,
                viewer: viewer.ref.current,
              });
              setMetadata(toMetadata({ hit }));
            }}
            viewer={viewer.ref}
          />
        )
      }
      rightDrawer={<RightDrawer metadata={metadata} viewer={viewer} open />}
      rightDrawerWidth={RightDrawerWidth}
    />
  ) : (
    <></>
  );
}
