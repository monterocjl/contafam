export default async function addToDataBase(completeData, database) {
  const JSONdata = JSON.stringify(completeData);
  const endpoint = `/api/${database}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);
  return response ? response : null;
}
