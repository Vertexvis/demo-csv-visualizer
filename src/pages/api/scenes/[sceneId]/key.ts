import { Failure, StreamKey } from '@vertexvis/api-client-node';
import type { NextApiRequest, NextApiResponse } from 'next';

import { makeCallAndReturn } from '../../../../lib/vertex-api';

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<StreamKey | Failure>
): Promise<void> {
  const { sceneId } = req.query;

  return makeCallAndReturn(res, (client) =>
    client.streamKeys.createSceneStreamKey({
      id: sceneId.toString(),
      createStreamKeyRequest: {
        data: { type: 'create-stream-key', attributes: { expiry: 86400 } },
      },
    })
  );
}
