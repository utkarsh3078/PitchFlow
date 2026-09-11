import ImageKit from "@imagekit/nodejs";

let imageKitClient: ImageKit | null = null;

function getImageClient(): ImageKit {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not set.");
  }

  imageKitClient ??= new ImageKit({ privateKey });
  return imageKitClient;
}

export { getImageClient };
