document.querySelector('.profile-icon').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents click event from bubbling up
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });