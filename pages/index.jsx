import {Router, Routes, Route} from "react-router-dom";
import Header from "../src/layouts/Header";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

const Index = ({ videosData, bonfireData }) => {
  return (
    <div>we are index</div>
  );
};

export async function getServerSideProps() {
  const videosRes = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLvEM_7dT9mGC-daRqTVb5bgwcEGQ1sPB8&key=${process.env.YOUTUBE_API_KEY}`
  );


  const bonfireRes = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLvEM_7dT9mGDjLAAJBMUgm4qpCzCtLAXm&key=${process.env.YOUTUBE_API_KEY}`
  );

  const videosData = await videosRes.json();
  const bonfireData= await bonfireRes.json();
  return {
    props: {
      videosData,
      bonfireData
    },
  };
}

export default Index;
