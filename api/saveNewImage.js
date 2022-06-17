export default async function saveNewImage(file) {
  const imgData = new FormData();
  imgData.append("file", file);
  imgData.append("upload_preset", "conta-fam");

  const data = await fetch(
    "https://api.cloudinary.com/v1_1/gscloudinary/image/upload",
    {
      method: "POST",
      body: imgData,
    }
  ).then((r) => r.json());

  return data ? data : null;
}
