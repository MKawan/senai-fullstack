$(function () {
  const $mobileToggle = $("#mobileToggle");
  const $mobileNav = $("#mobileNav");
  $("#year").text(new Date().getFullYear());

  $mobileToggle.on("click", function () {
    $mobileNav.toggleClass("is-open");
  });

  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    $(".product-card").each(function () {
      const category = $(this).data("category");
      const shouldShow = filter === "all" || category === filter;
      $(this).toggleClass("is-hidden", !shouldShow);
    });
  });

  $("#newsletterForm").on("submit", function (event) {
    event.preventDefault();
    const email = $(this).find('input[name="email"]').val().trim();
    const feedback = $("#newsletterFeedback");

    if (!email || !email.includes("@")) {
      feedback
        .text("Informe um e-mail válido para receber as ofertas.")
        .removeClass("success")
        .addClass("error");
      return;
    }

    feedback
      .text(`Tudo certo! ${email} foi cadastrado para novidades exclusivas.`)
      .removeClass("error")
      .addClass("success");
    this.reset();
  });

  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    const email = $(this).find('input[name="email"]').val().trim();
    const password = $(this).find('input[name="password"]').val();
    const feedback = $("#loginFeedback");

    if (!email || !password) {
      feedback
        .text("Preencha e-mail e senha para entrar.")
        .removeClass("success")
        .addClass("error");
      return;
    }

    feedback
      .text(`Bem-vindo de volta, ${email}!`)
      .removeClass("error")
      .addClass("success");
  });

  $("#registerForm").on("submit", function (event) {
    event.preventDefault();
    const name = $(this).find('input[name="name"]').val().trim();
    const email = $(this).find('input[name="email"]').val().trim();
    const password = $(this).find('input[name="password"]').val();
    const confirm = $(this).find('input[name="confirmPassword"]').val();
    const feedback = $("#registerFeedback");

    if (!name || !email || !password || !confirm) {
      feedback
        .text("Preencha todos os campos para concluir o cadastro.")
        .removeClass("success")
        .addClass("error");
      return;
    }

    if (password.length < 6) {
      feedback
        .text("A senha deve ter pelo menos 6 caracteres.")
        .removeClass("success")
        .addClass("error");
      return;
    }

    if (password !== confirm) {
      feedback
        .text("As senhas precisam ser iguais.")
        .removeClass("success")
        .addClass("error");
      return;
    }

    feedback
      .text(`Conta criada com sucesso para ${name}!`)
      .removeClass("error")
      .addClass("success");
    this.reset();
  });
});
