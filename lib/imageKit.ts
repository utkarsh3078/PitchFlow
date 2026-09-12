import ImageKit, { toFile } from "@imagekit/nodejs";

let imageKitClient: ImageKit | null = null;

function getImageClient(): ImageKit {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not set.");
  }

  imageKitClient ??= new ImageKit({ privateKey });
  return imageKitClient;
}

export async function uploadSlideImage(
  buffer: Buffer,
  fileName: string,
): Promise<string> {
  const client = getImageClient();
  const response = await client.files.upload({
    file: await toFile(buffer, fileName),
    fileName,
    folder: "/pitchflow/slides",
  });

  if (!response.url) {
    throw new Error("ImageKit upload did not return a URL");
  }

  return response.url;
}

export { getImageClient };
