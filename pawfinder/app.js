const API_URL = 'http://localhost:3000/animals';

const form = document.getElementById('animalForm');
const formTitle = document.getElementById('formTitle');
const submitButton = document.getElementById('submitButton');
const resetFormButton = document.getElementById('resetFormButton');
const animalsContainer = document.getElementById('animalsContainer');
const errorState = document.getElementById('errorState');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const speciesFilter = document.getElementById('speciesFilter');
const statusFilter = document.getElementById('statusFilter');
const sortSelect = document.getElementById('sortSelect');

const totalCount = document.getElementById('totalCount');
const availableCount = document.getElementById('availableCount');
const adoptedCount = document.getElementById('adoptedCount');

const state = {
  animals: [],
  filters: {
    search: '',
    species: 'All',
    status: 'All',
    sort: 'name-asc',
  },
  editingId: null,
  isSubmitting: false,
};

init();

function init() {
  bindEvents();
  loadAnimals();
}

function bindEvents() {
  form.addEventListener('submit', handleSubmit);
  resetFormButton.addEventListener('click', resetForm);
  searchInput.addEventListener('input', (event) => {
    state.filters.search = event.target.value.trim();
    applyFilters();
  });
  speciesFilter.addEventListener('change', (event) => {
    state.filters.species = event.target.value;
    applyFilters();
  });
  statusFilter.addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    applyFilters();
  });
  sortSelect.addEventListener('change', (event) => {
    state.filters.sort = event.target.value;
    applyFilters();
  });
  animalsContainer.addEventListener('click', handleAnimalActions);
}

async function loadAnimals() {
  clearErrorState();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Unable to load animals from the shelter database.');
    }

    const data = await response.json();
    state.animals = data.map((animal) => ({
      ...animal,
      id: getSafeId(animal.id),
      age: Number(animal.age),
    }));

    updateSummary();
    applyFilters();
  } catch (error) {
    showErrorState(error.message || 'Something went wrong while fetching animals.');
  }
}

function applyFilters() {
  const searchTerm = state.filters.search.toLowerCase();

  const visibleAnimals = [...state.animals]
    .filter((animal) => {
      const matchesSearch =
        animal.name.toLowerCase().includes(searchTerm) ||
        animal.breed.toLowerCase().includes(searchTerm);

      const matchesSpecies =
        state.filters.species === 'All' || animal.species === state.filters.species;
      const matchesStatus =
        state.filters.status === 'All' || animal.status === state.filters.status;

      return matchesSearch && matchesSpecies && matchesStatus;
    })
    .sort((a, b) => {
      switch (state.filters.sort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'age-asc':
          return a.age - b.age;
        case 'age-desc':
          return b.age - a.age;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  renderAnimals(visibleAnimals);
  updateSummary();
}

function renderAnimals(animals) {
  animalsContainer.replaceChildren();

  if (animals.length === 0) {
    emptyState.classList.remove('d-none');
    return;
  }

  emptyState.classList.add('d-none');

  animals.forEach((animal) => {
    const column = document.createElement('div');
    column.className = 'col-md-6 col-xl-4';
    column.appendChild(buildAnimalCard(animal));
    animalsContainer.appendChild(column);
  });
}

function buildAnimalCard(animal) {
  const card = document.createElement('article');
  card.className = 'card pet-card';
  if (animal.status === 'Adopted') {
    card.classList.add('adopted');
  }

  const image = document.createElement('img');
  image.className = 'animal-image';
  image.src = animal.photoUrl || 'https://placehold.co/600x400/edf3ff/1f2937?text=PawFinder';
  image.alt = `${animal.name} the ${animal.species}`;
  image.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'card-body';

  const header = document.createElement('div');
  header.className = 'animal-header';

  const title = document.createElement('h3');
  title.className = 'animal-name';
  title.textContent = animal.name;

  const badge = document.createElement('span');
  badge.className = `status-badge ${animal.status.toLowerCase()}`;
  badge.textContent = animal.status;

  header.append(title, badge);

  const details = document.createElement('ul');
  details.className = 'animal-details';

  const rows = [
    ['Species', animal.species],
    ['Breed', animal.breed],
    ['Age', `${animal.age} yrs`],
    ['Gender', animal.gender],
    ['Arrival', formatDate(animal.arrivalDate)],
    ['Vaccinated', animal.vaccinated ? 'Yes' : 'No'],
  ];

  rows.forEach(([label, value]) => {
    const item = document.createElement('li');
    const key = document.createElement('span');
    const val = document.createElement('strong');
    key.textContent = label;
    val.textContent = value;
    item.append(key, val);
    details.appendChild(item);
  });

  const notes = document.createElement('p');
  notes.className = 'animal-notes';
  notes.textContent = animal.notes || 'No extra notes.';

  const actions = document.createElement('div');
  actions.className = 'action-buttons';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'btn btn-outline-primary btn-sm';
  editButton.textContent = 'Edit';
  editButton.dataset.action = 'edit';
  editButton.dataset.id = String(animal.id);

  const adoptButton = document.createElement('button');
  adoptButton.type = 'button';
  adoptButton.className = 'btn btn-success btn-sm';
  adoptButton.textContent = animal.status === 'Adopted' ? 'Adopted' : 'Adopt';
  adoptButton.dataset.action = 'adopt';
  adoptButton.dataset.id = String(animal.id);
  adoptButton.disabled = animal.status === 'Adopted';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-outline-danger btn-sm';
  deleteButton.textContent = 'Delete';
  deleteButton.dataset.action = 'delete';
  deleteButton.dataset.id = String(animal.id);

  actions.append(editButton, adoptButton, deleteButton);
  body.append(header, details, notes, actions);
  card.append(image, body);

  return card;
}

async function handleSubmit(event) {
  event.preventDefault();

  if (state.isSubmitting) {
    return;
  }

  if (!validateForm()) {
    return;
  }

  const animalPayload = collectFormData();

  state.isSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = state.editingId ? 'Saving...' : 'Registering...';

  try {
    let response;

    if (state.editingId) {
      response = await fetch(`${API_URL}/${state.editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalPayload),
      });
    } else {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalPayload),
      });
    }

    if (!response.ok) {
      throw new Error('The shelter could not save that animal record.');
    }

    resetForm();
    await loadAnimals();
  } catch (error) {
    showErrorState(error.message || 'Could not save the animal record.');
  } finally {
    state.isSubmitting = false;
    submitButton.disabled = false;
    submitButton.textContent = state.editingId ? 'Update animal' : 'Add animal';
  }
}

async function handleAnimalActions(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = getSafeId(button.dataset.id);

  if (!action || id === null || id === undefined) {
    return;
  }

  if (action === 'edit') {
    await loadAnimalForEdit(id);
    return;
  }

  if (action === 'adopt') {
    await updateAnimalStatus(id, 'Adopted');
    return;
  }

  if (action === 'delete') {
    await deleteAnimal(id);
  }
}

async function loadAnimalForEdit(id) {
  clearErrorState();

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error('Unable to fetch that animal record.');
    }

    const animal = await response.json();
    populateForm(animal);
  } catch (error) {
    showErrorState(error.message || 'Could not edit that animal.');
  }
}

async function updateAnimalStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('The adoption status could not be updated.');
    }

    await loadAnimals();
  } catch (error) {
    showErrorState(error.message || 'Unable to update adoption status.');
  }
}

async function deleteAnimal(id) {
  const animalToDelete = state.animals.find((animal) => animal.id === id);
  const confirmed = window.confirm(
    `Delete ${animalToDelete ? animalToDelete.name : 'this animal'} from the board?`
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('The animal record could not be deleted.');
    }

    if (state.editingId === id) {
      resetForm();
    }

    await loadAnimals();
  } catch (error) {
    showErrorState(error.message || 'Unable to delete the animal.');
  }
}

function populateForm(animal) {
  state.editingId = getSafeId(animal.id);
  formTitle.textContent = 'Edit animal';
  submitButton.textContent = 'Update animal';

  Object.entries(animal).forEach(([key, value]) => {
    const element = form.elements.namedItem(key);

    if (!element) {
      return;
    }

    if (element.type === 'checkbox') {
      element.checked = Boolean(value);
      return;
    }

    element.value = value;
  });
}

function collectFormData() {
  const formData = new FormData(form);

  return {
    name: String(formData.get('name') || '').trim(),
    species: String(formData.get('species') || '').trim(),
    breed: String(formData.get('breed') || '').trim(),
    age: Number(formData.get('age')),
    gender: String(formData.get('gender') || '').trim(),
    vaccinated: formData.get('vaccinated') === 'on',
    arrivalDate: String(formData.get('arrivalDate') || '').trim(),
    status: String(formData.get('status') || 'Available').trim(),
    notes: String(formData.get('notes') || '').trim(),
    photoUrl: String(formData.get('photoUrl') || '').trim(),
  };
}

function validateForm() {
  clearValidationErrors();

  const data = collectFormData();
  let isValid = true;

  if (!data.name || data.name.length < 2) {
    showFieldError('name', 'Name must be at least 2 characters.');
    isValid = false;
  }

  if (!data.species) {
    showFieldError('species', 'Please choose a species.');
    isValid = false;
  }

  if (!data.breed || data.breed.length < 2) {
    showFieldError('breed', 'Breed is required.');
    isValid = false;
  }

  if (!Number.isFinite(data.age) || data.age < 0) {
    showFieldError('age', 'Age must be a non-negative number.');
    isValid = false;
  }

  if (!data.gender) {
    showFieldError('gender', 'Please choose a gender.');
    isValid = false;
  }

  if (!data.arrivalDate) {
    showFieldError('arrivalDate', 'Arrival date is required.');
    isValid = false;
  }

  if (!data.status) {
    showFieldError('status', 'Status is required.');
    isValid = false;
  }

  if (!data.photoUrl || !/^https?:\/\//i.test(data.photoUrl)) {
    showFieldError('photoUrl', 'Please enter a valid photo URL.');
    isValid = false;
  }

  return isValid;
}

function clearValidationErrors() {
  document.querySelectorAll('[data-error-for]').forEach((node) => {
    node.textContent = '';
  });

  form.querySelectorAll('.is-invalid').forEach((field) => {
    field.classList.remove('is-invalid');
  });
}

function showFieldError(fieldName, message) {
  const field = form.elements.namedItem(fieldName);
  const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (field) {
    field.classList.add('is-invalid');
  }

  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearErrorState() {
  errorState.classList.add('d-none');
  errorState.textContent = '';
}

function showErrorState(message) {
  errorState.textContent = message;
  errorState.classList.remove('d-none');
}

function updateSummary() {
  const totals = state.animals.reduce(
    (accumulator, animal) => {
      accumulator.total += 1;

      if (animal.status === 'Available') {
        accumulator.available += 1;
      }

      if (animal.status === 'Adopted') {
        accumulator.adopted += 1;
      }

      return accumulator;
    },
    { total: 0, available: 0, adopted: 0 }
  );

  totalCount.textContent = totals.total;
  availableCount.textContent = totals.available;
  adoptedCount.textContent = totals.adopted;
}

function resetForm() {
  state.editingId = null;
  form.reset();
  formTitle.textContent = 'Register a new animal';
  submitButton.textContent = 'Add animal';
  clearValidationErrors();

  const defaultStatus = form.elements.namedItem('status');
  if (defaultStatus) {
    defaultStatus.value = 'Available';
  }
}

function getSafeId(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return value;
  }

  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? String(value) : numericValue;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return 'Unknown';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
