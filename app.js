const POSTS_URL = "https://api.npoint.io/05660f5cb7d054e15c2a";

// Task 5 (teammate): comment out the line above and use the local file instead:
// const POSTS_URL = "posts.json";

const postsContainer = document.getElementById("posts");

function formatDate(isoDate) {
  // "2026-09-30" -> "Sep 30, 2026"; UTC avoids off-by-one day shifts
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function createPostElement(post) {
  const article = document.createElement("article");

  const heading = document.createElement("h2");
  heading.className = "hidden";
  heading.textContent = `Post ${post.id}`;

  const header = document.createElement("header");

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.title = post.author;

  const author = document.createElement("span");
  author.className = "author";
  author.textContent = post.author;

  const time = document.createElement("time");
  time.dateTime = post.createdAt;
  time.textContent = formatDate(post.createdAt);

  header.append(avatar, author, time);
  article.append(heading, header);

  // Posts without a photo skip the <img>
  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.imageAlt ?? "";
    article.append(img);
  }

  const text = document.createElement("p");
  text.textContent = post.text;

  const like = document.createElement("button");
  like.className = "like";
  like.textContent = "👍";

  article.append(text, like);
  return article;
}

async function loadPosts() {
  try {
    const response = await fetch(POSTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const posts = await response.json();

    // Newest first
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    postsContainer.replaceChildren(...posts.map(createPostElement));
  } catch (error) {
    console.error("Failed to load posts:", error);
    postsContainer.textContent = "Could not load posts.";
  }
}

loadPosts();
