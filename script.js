/** async function loadPosts() {
  try {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        try {
          let responseData = JSON.parse(req.responseText);

          console.log(responseData.record);

          const mainElement = document.querySelector("main");

          responseData.record.forEach((post) => {
            const article = document.createElement("article");
            article.classList.add("blogPost");

            const postNav = document.createElement("div");
            postNav.classList.add("postNav");

            const authorIcon = document.createElement("img");
            authorIcon.src = post.postAuthorPFP;
            authorIcon.alt = "Default User Avatar";
            authorIcon.classList.add("user-icon");

            const timestamp = document.createElement("p");
            const date = new Date(post.postCreated);
            timestamp.textContent = `${date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}, ${date.toLocaleDateString([], {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}`;

            postNav.appendChild(authorIcon);
            postNav.appendChild(timestamp);

            const postImage = document.createElement("img");
            postImage.src = post.postImage;
            postImage.classList.add("post-image");

            const postText = document.createElement("h1");
            postText.textContent = post.postText;

            const authorName = document.createElement("p");
            authorName.classList.add("author-name");
            authorName.textContent = `Posted by ${post.postAuthorName}`;

            article.appendChild(postNav);
            article.appendChild(postImage);
            article.appendChild(postText);
            article.appendChild(authorName);

            mainElement.appendChild(article);
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    req.open(
      "GET",
      "https://api.jsonbin.io/v3/b/67276d11e41b4d34e44d91b3",
      true
    );
    req.setRequestHeader(
      "X-Master-Key",
      "$2a$10$uyObItJW.L4fgH3Qs5fPYOAAM5IMR9P2zjwKygeWvTHIah48zIb/2"
    );
    req.send();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

loadPosts();
*/

async function loadPosts() {
  try {
    const response = await fetch("./posts.json");
    const posts = await response.json();

    const mainElement = document.querySelector("main");

    posts.forEach((post) => {
      const article = document.createElement("article");
      article.classList.add("blogPost");

      const postNav = document.createElement("div");
      postNav.classList.add("postNav");

      const authorIcon = document.createElement("img");
      authorIcon.src = post.postAuthorPFP;
      authorIcon.alt = "Default User Avatar";
      authorIcon.classList.add("user-icon");

      const timestamp = document.createElement("p");
      const date = new Date(post.postCreated);
      timestamp.textContent = `${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}, ${date.toLocaleDateString([], {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`;

      postNav.appendChild(authorIcon);
      postNav.appendChild(timestamp);

      const postImage = document.createElement("img");
      postImage.src = post.postImage;
      postImage.classList.add("post-image");

      const postTxt = document.createElement("h1");
      postTxt.textContent = post.postText;

      const authorName = document.createElement("p");
      authorName.classList.add("author-name");
      authorName.textContent = `Posted by ${post.postAuthorName}`;

      article.appendChild(postNav);
      article.appendChild(postImage);
      article.appendChild(postTxt);
      article.appendChild(authorName);

      mainElement.appendChild(article);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

loadPosts();
