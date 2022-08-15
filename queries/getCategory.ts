import axios from "axios";

export const getCategory = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
    }
  );
  return data;
};
