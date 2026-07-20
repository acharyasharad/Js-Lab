/* ══════════════════════════════════════════════
   ShopZone – Amazon-like Store (JavaScript)
   ══════════════════════════════════════════════ */

'use strict';

/* ── Constants ── */
const GST_RATE = 0.18;
const FREE_DELIVERY_THRESHOLD = 499;

const PRODUCTS = [
  { id:'p1', name: 'Ultrabook Laptop 14" - i5 / 16GB / 512GB', desc:'Lightweight productivity laptop', price:54990, img:'https://picsum.photos/seed/laptop1/320/240' },
  { id:'p2', name: 'Gaming Laptop 15" - i7 / 16GB / RTX3050', desc:'Performance for gaming and dev', price:85990, img:'https://picsum.photos/seed/laptop2/320/240' },
  { id:'p3', name: 'Wireless Noise-Cancelling Headphones', desc:'Over-ear, 30h battery', price:12490, img:'https://picsum.photos/seed/headphones/320/240' },
  { id:'p4', name: 'NVMe M.2 SSD 1TB', desc:'Fast NVMe storage (1TB)', price:7490, img:'https://picsum.photos/seed/nvme/320/240' },
  { id:'p5', name: 'USB-C Docking Station', desc:'Ports: HDMI, USB-A, Ethernet', price:3990, img:'https://picsum.photos/seed/dock/320/240' },
  { id:'p6', name: 'Wireless Router AX3000', desc:'Wi‑Fi 6, dual-band', price:6990, img:'https://picsum.photos/seed/router/320/240' },
  { id:'p7', name: 'Raspberry Pi 4 Model B (4GB)', desc:'Single-board computer', price:4999, img:'https://picsum.photos/seed/raspberrypi/320/240' },
  { id:'p8', name: 'Digital Multimeter', desc:'Auto-range multimeter', price:899, img:'https://picsum.photos/seed/multimeter/320/240' }
];

function renderProducts(){
  const el = document.getElementById('products');
  el.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const node = document.createElement('div'); node.className='product';
    node.innerHTML = `
      <div class="info"><div class="title">${p.name}</div><div class="desc">${p.desc}</div></div>
      <div class="meta"><div class="price">₹${p.price}</div><input class="qty" type="number" min="0" value="0" data-id="${p.id}"/></div>
    `;
    el.appendChild(node);
  });
}

function calculate(){
  let subtotal = 0;
  document.querySelectorAll('.qty').forEach(i=>{
    const id = i.dataset.id; const q = Number(i.value) || 0;
    const p = PRODUCTS.find(x=>x.id===id);
    subtotal += p.price * q;
  });
  const gst = +(subtotal * GST_RATE).toFixed(2);
  const total = +(subtotal + gst).toFixed(2);
  document.getElementById('subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN', {minimumFractionDigits:2});
  document.getElementById('gst').textContent = '₹' + gst.toLocaleString('en-IN', {minimumFractionDigits:2});
  document.getElementById('total').textContent = '₹' + total.toLocaleString('en-IN', {minimumFractionDigits:2});
  return { subtotal, gst, total };
}

function checkout(){
  const bill = calculate();
  const items = [];
  document.querySelectorAll('.qty').forEach(i=>{
    const q = Number(i.value) || 0; if(q<=0) return;
    const p = PRODUCTS.find(x=>x.id===i.dataset.id);
    items.push({ id:p.id, name:p.name, price:p.price, qty:q });
  });
  if(items.length===0){ alert('No items selected'); return; }
  const payload = { items, subtotal: bill.subtotal, gst: bill.gst, total: bill.total };
  try{ localStorage.setItem('techshop_bill', JSON.stringify(payload)); }catch(e){ console.error(e); }
  window.open('bill.html', '_blank');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  document.getElementById('calculate').addEventListener('click', calculate);
  document.getElementById('checkout').addEventListener('click', checkout);
});