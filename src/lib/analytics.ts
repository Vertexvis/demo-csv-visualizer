import { parse } from 'papaparse';

export interface AnalysisResultItem {
  partId: string;
  color: string;
}

export interface AnalysisResult {
  items: AnalysisResultItem[];
}

export function parseFile(file: File): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', () =>
      reject(new Error('Error reading file'))
    );
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        const result = parse<AnalysisResultItem>(reader.result, {
          header: true,
        });

        if (result.errors.length > 0) {
          console.warn('Invalid CSV file', result.errors);
          reject(new Error('Invalid CSV file, see JavaScript console.'));
        } else {
          resolve({ items: result.data });
        }
      }
    });
    reader.readAsText(file);
  });
}

export async function visualizeFile(
  file: File,
  viewer: HTMLVertexViewerElement
): Promise<void> {
  const result = await parseFile(file);
  await visualizeResult(result, viewer);
}

export async function visualizeResult(
  result: AnalysisResult,
  viewer: HTMLVertexViewerElement
): Promise<void> {
  const scene = await viewer.scene();
  scene
    .items((op) => [
      op.where((q) => q.all()).materialOverride('#ffffff'),
      ...result.items.map((item) =>
        op
          .where((q) => q.withMetadata(item.partId, ['c4cb_part_number'], true))
          .materialOverride(item.color)
      ),
    ])
    .execute();
}
