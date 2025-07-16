const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});


const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});


const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    window.location.href = target;
  });
});


if (document.getElementById('product-list')) {
  const products = [
  {
    name: 'Bluetooth Speaker',
    price: 1299,
    category: 'electronics',
    image: 'images/speaker.jpg'
  },
  {
    name: 'Cotton T-Shirt',
    price: 499,
    category: 'clothing',
    image: 'images/tshirt.jpg'
  },
  {
    name: 'JavaScript Book',
    price: 899,
    category: 'books',
    image: 'images/book.jpg'
  },
  {
    name: 'Headphones',
    price: 1999,
    category: 'electronics',
    image: 'images/headphones.jpg'
  },
  {
    name: 'Notebook',
    price: 199,
    category: 'books',
    image: 'images/notebook.jpg'
  }
];



  const productList = document.getElementById('product-list');
  const filterCategory = document.getElementById('filter-category');
  const sortPrice = document.getElementById('sort-price');

  function renderProducts(list) {
    productList.innerHTML = '';
    list.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-item';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; max-height:180px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
        <h4>${product.name}</h4>
        <p>Price: ₹${product.price}</p>
        <p>Category: ${product.category}</p>
      `;
      productList.appendChild(div);
    });
  }

  function filterAndSort() {
    let filtered = [...products];
    const category = filterCategory.value;
    const sort = sortPrice.value;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  }

  filterCategory.addEventListener('change', filterAndSort);
  sortPrice.addEventListener('change', filterAndSort);

  renderProducts(products);
}

// ✅ To-Do List with localStorage
if (document.getElementById('todo-form')) {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  renderTodoList();

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
      todos.push({ text: task, done: false });
      localStorage.setItem('todos', JSON.stringify(todos));
      todoInput.value = '';
      renderTodoList();
    }
  });

  function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', item.done);

      const span = document.createElement('span');
      span.textContent = item.text;
      span.style.flex = '1';
      span.onclick = () => toggleComplete(index);

      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.onclick = () => deleteTask(index);

      li.appendChild(span);
      li.appendChild(btn);
      todoList.appendChild(li);
    });
  }

  function toggleComplete(index) {
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
  }

  function deleteTask(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
  }
}

// 📄 Resume download button
const resumeBtn = document.createElement('button');
resumeBtn.className = 'resume-btn';
resumeBtn.textContent = 'Download Resume';
resumeBtn.onclick = () => window.open('resume.pdf', '_blank');
document.body.appendChild(resumeBtn);