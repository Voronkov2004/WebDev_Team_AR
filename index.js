let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    let responseData = JSON.parse(req.responseText);

    console.log(responseData.record);

    responseData.record.forEach((post) => {
      console.log(post.postAuthorName, post.postText);
    });
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/67276d11e41b4d34e44d91b3", true);
req.setRequestHeader(
  "X-Master-Key",
  "$2a$10$uyObItJW.L4fgH3Qs5fPYOAAM5IMR9P2zjwKygeWvTHIah48zIb/2"
);
req.send();
