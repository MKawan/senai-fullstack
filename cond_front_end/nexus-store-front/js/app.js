$(function () {
  const products = [
    {
      id: 1,
      name: "Headset Kraken Pro V2",
      brand: "Razer",
      price: 349.9,
      originalPrice: 499.9,
      category: "headsets",
      tag: "OFERTA",
      tagColor: "#ff3366",
      img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop&auto=format",
      rating: 4.8,
      reviews: 2341,
    },
    {
      id: 2,
      name: "Mouse DeathAdder V3",
      brand: "Razer",
      price: 289.9,
      category: "mouses",
      tag: "NOVO",
      tagColor: "#00d4ff",
      img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&auto=format",
      rating: 4.9,
      reviews: 5102,
    },
    {
      id: 3,
      name: "Teclado Huntsman V2",
      brand: "Razer",
      price: 649.9,
      originalPrice: 799.9,
      category: "teclados",
      tag: "TOP SELLER",
      tagColor: "#a855f7",
      img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&auto=format",
      rating: 4.7,
      reviews: 1876,
    },
    {
      id: 4,
      name: 'Monitor Odyssey G7 27"',
      brand: "Samsung",
      price: 2899.9,
      category: "monitores",
      tag: "240Hz",
      tagColor: "#00ff88",
      img: "assets/img/screen.png",
      rating: 4.9,
      reviews: 934,
    },
    {
      id: 5,
      name: "Cadeira DXRacer Formula",
      brand: "DXRacer",
      price: 1599.9,
      originalPrice: 1999.9,
      category: "cadeiras",
      img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop&auto=format",
      rating: 4.6,
      reviews: 743,
    },
    {
      id: 6,
      name: "Controle DualSense Edge",
      brand: "Sony",
      price: 899.9,
      category: "controles",
      tag: "PS5",
      tagColor: "#0057ff",
      img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop&auto=format",
      rating: 4.8,
      reviews: 2108,
    },
    {
      id: 7,
      name: "Placa de Vídeo RTX 4080",
      brand: "NVIDIA",
      price: 5499.9,
      category: "hardware",
      tag: "HIGH-END",
      tagColor: "#76c442",
      img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop&auto=format",
      rating: 5,
      reviews: 412,
    },
    {
      id: 8,
      name: "Mousepad XL Firepow",
      brand: "HyperX",
      price: 129.9,
      category: "mouses",
      tag: "MAIS VENDIDO",
      tagColor: "#ff6b00",
      img: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=400&h=300&fit=crop&auto=format",
      rating: 4.5,
      reviews: 8320,
    },
  ];
  const categories = [
    ["todos", "Todos"],
    ["headsets", "Headsets"],
    ["mouses", "Mouses"],
    ["teclados", "Teclados"],
    ["monitores", "Monitores"],
    ["cadeiras", "Cadeiras"],
    ["controles", "Controles"],
    ["hardware", "Hardware"],
  ];
  const categoryCards = [
    [
      "Headsets",
      "",
      "240+ produtos",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=200&fit=crop&auto=format",
    ],
    ["Monitores", "", "180+ produtos", "assets/img/screen.png"],
    [
      "Cadeiras",
      "",
      "95+ produtos",
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&h=200&fit=crop&auto=format",
    ],
    [
      "Hardware",
      "",
      "320+ produtos",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop&auto=format",
    ],
  ];
  let cart = JSON.parse(localStorage.getItem("nexusCart") || "[]"),
    activeCategory = "todos";

  const money = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const save = () => localStorage.setItem("nexusCart", JSON.stringify(cart));
  const count = () => cart.reduce((s, i) => s + i.qty, 0);
  const $mainNav = $("#mainNav");
  const $mobileMenuButton = $(".mobile-menu-button");

  function renderCategories() {
    $("#categoryCards").html(
      categoryCards
        .map(
          (c) =>
            `<div class="col-12 col-md-6 col-xl-3"><div class="category-card" data-category="${c[0].toLowerCase()}"><img src="${c[3]}" alt="${c[0]}"><div class="category-overlay"></div><div class="category-info"><div>${c[1]}</div><h3 class="font-display">${c[0]}</h3><small class="font-mono-tech">${c[2]}</small></div></div></div>`,
        )
        .join(""),
    );
  }
  function renderFilters() {
    $("#categoryFilters").html(
      categories
        .map(
          (c) =>
            `<button class="category-filter ${activeCategory === c[0] ? "active" : ""}" data-category="${c[0]}">${c[1]}</button>`,
        )
        .join(""),
    );
  }
  function stars(r) {
    return "★★★★★"
      .split("")
      .map(
        (s, i) =>
          `<span style="color:${i < Math.round(r) ? "#f59e0b" : "#1e3a4a"}">${s}</span>`,
      )
      .join("");
  }
  function renderProducts() {
    const list =
      activeCategory === "todos"
        ? products
        : products.filter((p) => p.category === activeCategory);
    $("#productCount").text(list.length + " PRODUTOS");
    $("#productGrid").html(
      list
        .map((p) => {
          const discount = p.originalPrice
            ? Math.round((1 - p.price / p.originalPrice) * 100)
            : null;
          return `<div class="col-12 col-sm-6 col-lg-4 col-xl-3"><article class="product-card">
   ${p.tag ? `<span class="product-tag" style="background:${p.tagColor}">${p.tag}</span>` : ""}
   ${discount ? `<span class="discount">-${discount}%</span>` : ""}
   <img class="product-image w-100" src="${p.img}" alt="${p.name}">
   <div class="product-body"><div class="brand">${p.brand.toUpperCase()}</div><div class="product-name">${p.name}</div><div>${stars(p.rating)} <span class="reviews">(${p.reviews.toLocaleString("pt-BR")})</span></div></div>
   <div class="product-footer"><div>${p.originalPrice ? `<div class="old-price">${money(p.originalPrice)}</div>` : ""}<div class="price">${money(p.price)}</div><div class="installments">12x de ${money(p.price / 12)}</div></div><button class="add-btn" data-id="${p.id}">+ CARRINHO</button></div>
  </article></div>`;
        })
        .join(""),
    );
  }
  function renderCart() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    $("#cartCount, #cartCountDesktop")
      .text(count())
      .toggleClass("d-none", count() === 0);
    $("#cartItemsLabel").text(
      `${cart.length} ${cart.length === 1 ? "ITEM" : "ITENS"}`,
    );
    if (!cart.length) {
      $("#cartItems").html('<div class="empty-cart">CARRINHO VAZIO</div>');
      $("#cartFooter").addClass("d-none");
      return;
    }
    $("#cartItems").html(
      cart
        .map(
          (i) =>
            `<div class="cart-item"><img src="${i.img}" alt="${i.name}"><div class="cart-item-info"><div class="brand">${i.brand}</div><div class="cart-item-name">${i.name}</div><div class="price">${money(i.price)}</div><div class="qty-controls"><button class="qty-minus" data-id="${i.id}">−</button><span>${i.qty}</span><button class="qty-plus" data-id="${i.id}">+</button><button class="remove-item" data-id="${i.id}">REMOVER</button></div></div></div>`,
        )
        .join(""),
    );
    $("#cartFooter")
      .removeClass("d-none")
      .html(
        `<div class="d-flex justify-content-between align-items-center mb-2"><span class="text-secondary">SUBTOTAL</span><strong class="price">${money(total)}</strong></div><div class="font-mono-tech text-secondary mb-3">${total >= 299 ? "Frete grátis ✓ APLICADO" : "Frete grátis • Faltam " + money(299 - total)}</div><button class="btn btn-cyan w-100" id="checkoutBtn">FINALIZAR COMPRA</button>`,
      );
  }
  function add(id) {
    const p = products.find((x) => x.id === id),
      old = cart.find((x) => x.id === id);
    old ? old.qty++ : cart.push({ ...p, qty: 1 });
    save();
    renderCart();
  }
  renderCategories();
  renderFilters();
  renderProducts();
  renderCart();

  $(document).on("click", ".category-filter", function () {
    activeCategory = $(this).data("category");
    renderFilters();
    renderProducts();
  });
  $(document).on("click", ".category-card", function () {
    const name = $(this).data("category");
    const found = categories.find((c) => c[1].toLowerCase() === name);
    activeCategory = found ? found[0] : name;
    $("#products")[0].scrollIntoView({ behavior: "smooth" });
    renderFilters();
    renderProducts();
  });
  $(document).on("click", ".add-btn", function () {
    const b = $(this);
    add(Number(b.data("id")));
    b.addClass("added").text("✓ ADICIONADO");
    setTimeout(() => b.removeClass("added").text("+ CARRINHO"), 1200);
  });
  $(document).on("click", ".qty-plus", function () {
    const i = cart.find((x) => x.id == $(this).data("id"));
    i.qty++;
    save();
    renderCart();
  });
  $(document).on("click", ".qty-minus", function () {
    const i = cart.find((x) => x.id == $(this).data("id"));
    i.qty--;
    if (i.qty <= 0) cart = cart.filter((x) => x.id != i.id);
    save();
    renderCart();
  });
  $(document).on("click", ".remove-item", function () {
    cart = cart.filter((x) => x.id != $(this).data("id"));
    save();
    renderCart();
  });
  $("#cartBtn, #cartBtnDesktop").on("click", () => {
    renderCart();
    new bootstrap.Modal("#cartModal").show();
  });
  $("#searchBtn").on("click", () => {
    const q = prompt("Buscar produto:");
    if (!q) return;
    const result = products.filter((p) =>
      (p.name + " " + p.brand + " " + p.category)
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
    $("#productGrid").html(
      result
        .map((p) => {
          activeCategory = "todos";
          return `<div class="col-12 col-sm-6 col-lg-4 col-xl-3"><article class="product-card"><img class="product-image w-100" src="${p.img}"><div class="product-body"><div class="brand">${p.brand}</div><div class="product-name">${p.name}</div></div><div class="product-footer"><div class="price">${money(p.price)}</div><button class="add-btn" data-id="${p.id}">+ CARRINHO</button></div></article></div>`;
        })
        .join(""),
    );
  });
  $("#offerBtn").on("click", () => {
    activeCategory = "headsets";
    renderFilters();
    renderProducts();
    $("#products")[0].scrollIntoView({ behavior: "smooth" });
  });
  $("#checkoutBtn").on("click", () =>
    alert(
      "Checkout demonstrativo. Integração de pagamento ainda não configurada.",
    ),
  );
  $mainNav.on("show.bs.collapse", function () {
    $mobileMenuButton.attr("aria-expanded", "true");
  });

  $mainNav.on("hide.bs.collapse", function () {
    $mobileMenuButton.attr("aria-expanded", "false");
  });
  let seconds = 4 * 3600 + 27 * 60 + 13;
  setInterval(() => {
    if (seconds <= 0) return;
    seconds--;
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0"),
      m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"),
      s = String(seconds % 60).padStart(2, "0");
    $("#timer b").eq(0).text(h);
    $("#timer b").eq(1).text(m);
    $("#timer b").eq(2).text(s);
  }, 1000);
});
