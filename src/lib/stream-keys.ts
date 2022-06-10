import { StreamKey as ApiStreamKey } from '@vertexvis/api-client-node';

export type StreamKey = string;

export async function fetchStreamKey(
  baseUrl: string,
  sceneId: string
): Promise<StreamKey> {
  const res = await fetch(`${baseUrl}/api/scenes/${sceneId}/key`, {
    method: 'POST',
  });

  const json = (await res.json()) as ApiStreamKey;
  if (json.data.attributes.key == null) {
    throw new Error('Error creating stream key');
  }
  return json.data.attributes.key;
}
