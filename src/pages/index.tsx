import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import { Home } from '../components/Home';
import { Config, Configuration } from '../lib/config';
import { fetchStreamKey } from '../lib/stream-keys';

export interface Props {
  readonly config: Configuration;
  readonly streamKey: string;
}

export default function Index(props: Props): JSX.Element {
  return <Home {...props} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const host = context.req.headers.host;
  if (!host) {
    return Promise.reject(new Error('Server error. Cannot determine host.'));
  }

  const sceneId = process.env.SCENE_ID;

  if (sceneId == null) {
    throw new Error('Cannot load app. SCENE_ID is missing in env vars.');
  }

  const baseUrl = `http${host.startsWith('localhost') ? '' : 's'}://${host}`;
  const streamKey = await fetchStreamKey(baseUrl, sceneId);
  return { props: { config: Config, streamKey } };
}
