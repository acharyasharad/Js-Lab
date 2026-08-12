function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

function getCategory(total) {
  if (total > 10000) {
    return 'Expensive';
  }

  if (total < 1000) {
    return 'Cheap';
  }

  return 'Moderate';
}

function calculateItemSummary(name, cost, quantity) {
  const itemName = name || 'Unnamed Item';
  const itemCost = Number(cost) || 0;
  const itemQuantity = Number(quantity) || 0;
  const subtotal = itemCost * itemQuantity;
  const total = subtotal;

  return {
    name: itemName,
    itemCost,
    quantity: itemQuantity,
    subtotal,
    total,
    category: getCategory(total),
  };
}

function renderBill(items) {
  const billItemsEl = document.getElementById('bill-items');
  const cheapItemsEl = document.getElementById('cheap-items');
  const expensiveItemsEl = document.getElementById('expensive-items');

  if (!billItemsEl || !cheapItemsEl || !expensiveItemsEl) {
    return;
  }

  billItemsEl.innerHTML = items
    .map(
      (item, index) => `
        <tr>
          <td>${item.name}</td>
          <td>${formatCurrency(item.itemCost)}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.total)}</td>
          <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        </tr>
      `
    )
    .join('');

  const cheapItems = items.filter((item) => item.category === 'Cheap');
  const expensiveItems = items.filter((item) => item.category === 'Expensive');

  cheapItemsEl.innerHTML = cheapItems.length
    ? cheapItems
        .map((item) => `<div class="bill-item">${item.name} — ${formatCurrency(item.total)}</div>`)
        .join('')
    : '<div class="empty">No cheap items</div>';

  expensiveItemsEl.innerHTML = expensiveItems.length
    ? expensiveItems
        .map((item) => `<div class="bill-item">${item.name} — ${formatCurrency(item.total)}</div>`)
        .join('')
    : '<div class="empty">No expensive items</div>';
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('cart-form');
  const items = [];

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('item-name').value;
      const cost = document.getElementById('item-cost').value;
      const quantity = document.getElementById('item-quantity').value;
      const summary = calculateItemSummary(name, cost, quantity);
      items.push(summary);
      renderBill(items);
      form.reset();
      document.getElementById('item-name').focus();
    });
  }

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const index = Number(event.target.getAttribute('data-index'));
      items.splice(index, 1);
      renderBill(items);
    }
  });
}

if (typeof module !== 'undefined') {
  module.exports = { calculateItemSummary, formatCurrency, getCategory };
}
