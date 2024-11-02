async function loadPosts() {
    try {
      const response = await fetch('./posts.json');
      const posts = await response.json();
  
      const mainElement = document.querySelector('main');
  
      posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('blogPost');
        
        const postNav = document.createElement('div');
        postNav.classList.add('postNav');
  
        const authorIcon = document.createElement('img');
        authorIcon.src = 'images/me.png'; 
        authorIcon.alt = 'Default User Avatar';
        authorIcon.classList.add('user-icon');
  
        const timestamp = document.createElement('p');
        const date = new Date(post.timestamp);
        timestamp.textContent = `${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}, ${date.toLocaleDateString([], {day: 'numeric', month: 'short', year: 'numeric'})}`;
  
        postNav.appendChild(authorIcon);
        postNav.appendChild(timestamp);
  
        const postImage = document.createElement('img');
        postImage.src = post.postImage; 
        postImage.alt = post.postText;
        postImage.classList.add('post-image'); 
  
        const postText = document.createElement('h1');
        postText.textContent = post.postText;
  
        const authorName = document.createElement('p');
        authorName.classList.add('author-name');
        authorName.textContent = `Posted by ${post.postAuthor}`;
  
        article.appendChild(postNav);
        article.appendChild(postImage);
        article.appendChild(postText);
        article.appendChild(authorName); 
  
        mainElement.appendChild(article);
      });
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }
  
  loadPosts();

