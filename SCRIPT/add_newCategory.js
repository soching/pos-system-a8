    // Retrieve categories from local storage or create an empty array
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    // Function to render categories in the list
    function renderCategories() {
      const categoryList = document.getElementById('categoryList');
      categoryList.innerHTML = '';

      categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category;
        categoryList.appendChild(listItem);
      });

      // Populate select options
      const categorySelect = document.getElementById('categorySelect');
      categorySelect.innerHTML = '';

      categories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }

    // Add category to the list and local storage
    function addCategory(category) {
      categories.push(category);
      localStorage.setItem('categories', JSON.stringify(categories));
      renderCategories();
    }

    // Delete category from the list and local storage
    function deleteCategory(category) {
      categories = categories.filter(item => item !== category);
      localStorage.setItem('categories', JSON.stringify(categories));
      renderCategories();
    }

    // Submit form event listener
    const form = document.getElementById('categoryForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const categoryNameInput = document.getElementById('categoryName');
      const categoryName = categoryNameInput.value.trim();

      if (categoryName !== '') {
        addCategory(categoryName);
        categoryNameInput.value = '';
      }
    });

    // Delete button event listener
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
      const categorySelect = document.getElementById('categorySelect');
      const selectedCategory = categorySelect.value;
      deleteCategory(selectedCategory);
    });

    // Initial rendering of categories
    renderCategories();