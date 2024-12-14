<template>
    <section class="contact-us">
      <h1>Contact Us</h1>
      <p>If you have any questions or concerns, feel free to reach out to us!</p>
      <div class="contact-info">
        <div class="info-item">
          <h2>Address</h2>
          <p>1234 Main Street</p>
          <p>City, State, 56789</p>
        </div>
        <div class="info-item">
          <h2>Email</h2>
          <p><a href="mailto:contact@example.com">contact@example.com</a></p>
        </div>
        <div class="info-item">
          <h2>Phone</h2>
          <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "ContactComponent",
  };
  </script>
  
  <style scoped>
  
  .contact-us {
    max-width: 800px;
    margin: 90px auto;
    
    text-align: center;
    padding: 20px;
   
    background-color: #c3c2c2;
  }
  
  .contact-us h1 {
    font-size: 2.5rem;
    color: #141313;
    margin-bottom: 20px;
  }
  
  .contact-us p {
    font-size: 1rem;
    color: #7a2828;
    line-height: 1.6;
  }
  
  .contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  }
  
  .info-item {
    flex: 1 1 calc(33.333% - 20px);
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .info-item h2 {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 10px;
  }
  
  .info-item p {
    font-size: 1rem;
    color: #555;
  }
  
  .info-item a {
    text-decoration: none;
    color: #7a2828;
  }
  
  .info-item a:hover {
    text-decoration: underline;
  }
  </style>
  