import { FileList } from '@vertexvis/api-client-node';
import { basename } from 'path';

export interface FileData {
  readonly created: string;
  readonly id: string;
  readonly name: string;
}

export async function fetchFiles(baseUrl: string): Promise<FileData[]> {
  const res = await fetch(`${baseUrl}/api/files`);
  const json = await res.json();
  if (json.errors != null) {
    throw new Error('Error fetching files');
  }
  return toFileData(json);
}

export function toFileData(fileList: FileList): FileData[] {
  return fileList.data.map((f) => ({
    created: f.attributes.created,
    id: f.id,
    name: basename(f.attributes.name),
  }));
}
