type resposeType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "trpc-api");

  return await fetch("https://api.cloudinary.com/v1_1/djeq8zxkz/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data: resposeType) => data.secure_url)
    .catch((err) => console.log(err));
};
