const BASE_URL_1 = "https://www.googleapis.com/youtube/v3";
const API_KEY_1 = "AIzaSyBgxIB-S94rRDsipVjeqDacaL5GQGgSUOM";

const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
const commentsContainer = document.getElementById("comments");

video_container.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

const videourl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY_1}`;

async function getComments() {
  const url = `${BASE_URL_1}/commentThreads?key=${API_KEY_1}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const comments = data.items;
  renderComments(comments);
}

async function getVideoInfo() {
  try {
    const response = await fetch(videourl);
    const data = await response.json();

    var videoTitle = data.items[0].snippet.title;
    var channelName = data.items[0].snippet.channelTitle;
    var logo=data.items[0].snippet.thumbnails.high.url;
    var likes = data.items[0].statistics.likeCount;
    var dislikes = data.items[0].statistics.dislikeCount;

    var videoInfoElement = document.getElementById('videoInfo');
    videoInfoElement.innerHTML = `
    <h4> ${videoTitle}</h4>
    <div class="bottom">
      <div class="left">
      <p><img src="${logo}"</p>
      <p>${channelName}</p>
      </div>
      <div class="right">
      <p> <img src="./Assets/liked.png">${likes}</p>
      <p><img src="./Assets/DisLiked.png"></p>
      <p><img src="./Assets/Share.png">Share</p>
      </div>
    </div>
    `;
  } catch (error) {
    console.error('Error:', error);
  }
}

getVideoInfo();

function renderComments(comments) {
  commentsContainer.innerHTML = "";
  comments.forEach((comment) => {
    commentsContainer.innerHTML += `
    <div class="hello">
    <p><img src="./Assets/Profile.png"></p>
    <div id="abc">
       <p><strong>${comment.snippet.topLevelComment.snippet.authorDisplayName}</strong></p>
        <p>${comment.snippet.topLevelComment.snippet.textDisplay}</p>
        <div class="likes">
          <p><img src="./Assets/liked.png"></p>
          <p><img src="./Assets/DisLiked.png"></p>
          <p>REPLY</p>
        </div>
    </div>
    </div>
    `;
  });
}

getComments();
