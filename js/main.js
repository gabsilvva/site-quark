  //NAV
const nav = document.querySelector(".nav");

nav.querySelector(".nav__principal__button")?.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
  document.documentElement.classList.toggle("o-hidden");
});

Array.from(["DOMContentLoaded", "scroll", "load"]).forEach((event) =>
  window.addEventListener(event, () => {
    document.body.scrollTop > 8 || document.documentElement.scrollTop > 8
      ? nav.classList.add("nav--fixed")
      : nav.classList.remove("nav--fixed");
  })
);

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("nav--open");
    document.documentElement.classList.remove("o-hidden");
  })
);

// COOKIES
const cookies = document.querySelector(".cookies");

cookies.querySelector("button").addEventListener("click", () => {
  cookies.classList.remove("cookies--open");
  localStorage.setItem("lgpd", true);
});

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("lgpd")) cookies.classList.add("cookies--open");
});

// CLIENTS
new Swiper(".clients .swiper", {
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    300: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});

// FORM
let url = null;

const btns = document.querySelectorAll("a[href='#contato'], button[data-form]");
const modals = document.querySelectorAll(".lead[data-form]");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.dataset.form || "contato";
    const modal = document.querySelector(`.lead[data-form="${target}"]`);
    modal?.classList.add("open");
  });
});

modals.forEach((modal) => {
  modal.querySelector("[data-close]")?.addEventListener("click", () => {
    modal.classList.remove("open");
  });
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? value : "";
}

if (getUrlParameter("utm_campaign").length > 0)
  localStorage.setItem("utm_campaign", getUrlParameter("utm_campaign"));
if (getUrlParameter("utm_source").length > 0)
  localStorage.setItem("utm_source", getUrlParameter("utm_source"));
if (getUrlParameter("utm_medium").length > 0)
  localStorage.setItem("utm_medium", getUrlParameter("utm_medium"));
if (getUrlParameter("utm_content").length > 0)
  localStorage.setItem("utm_content", getUrlParameter("utm_content"));
if (getUrlParameter("fbclid").length > 0)
  localStorage.setItem("fbclid", getUrlParameter("fbclid"));
if (getUrlParameter("gclid").length > 0)
  localStorage.setItem("gclid", getUrlParameter("gclid"));

function validate(input, regex) {
  const fieldset = input.closest("fieldset") || input.parentElement;
  const isValid = regex.test(input.value);
  if (isValid) {
    fieldset.classList.remove("invalid");
    fieldset.classList.add("valid");
  } else {
    fieldset.classList.add("invalid");
    fieldset.classList.remove("valid");
  }
  return isValid;
}

function validateFilled(input) {
  return validate(input, /\S+/);
}

function validateName(input) {
  return validate(
    input,
    /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
  );
}

function validateEmail(input) {
  return validate(input, /^\S+@\S+\.\S+$/);
}

function validatePhone(input) {
  return validate(input, /^\(\d{2}\) \d{4,5}-\d{4}$/);
}

function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .replace(/(-\d{4})\d+?$/, "$1");
}

function createFeedbackElements(form) {
  const existingFeedbacks = form.querySelectorAll(".feedback");
  existingFeedbacks.forEach((el) => el.remove());

  const successEl = document.createElement("span");
  successEl.className = "feedback feedback-success";
  successEl.innerHTML = "✅ Formulário enviado com sucesso!";

  const errorFieldsEl = document.createElement("span");
  errorFieldsEl.className = "feedback feedback-error-fields";
  errorFieldsEl.innerHTML = "❌ Por favor, corrija os campos inválidos.";

  const errorReqEl = document.createElement("span");
  errorReqEl.className = "feedback feedback-error-req";
  errorReqEl.innerHTML = "⚠️ O envio falhou. Tente novamente.";

  form.appendChild(successEl);
  form.appendChild(errorFieldsEl);
  form.appendChild(errorReqEl);

  return {
    success: successEl,
    errorFields: errorFieldsEl,
    errorReq: errorReqEl,
  };
}

function isFormValid(form) {
  const invalidFields = form.querySelectorAll(".invalid");

  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let hasEmptyRequired = false;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      hasEmptyRequired = true;
      const fieldset = field.closest("fieldset") || field.parentElement;
      fieldset.classList.add("invalid");
      fieldset.classList.remove("valid");
    }
  });

  return invalidFields.length === 0 && !hasEmptyRequired;
}

const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  form.querySelectorAll("input[name='nome']").forEach((input) => {
    input.addEventListener("input", (e) => validateName(e.target));
    input.addEventListener("blur", (e) => validateName(e.target));
  });

  form.querySelectorAll("input[name='email']").forEach((input) => {
    input.addEventListener("input", (e) => validateEmail(e.target));
    input.addEventListener("blur", (e) => validateEmail(e.target));
  });

  form.querySelectorAll("input[name='telefone']").forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = maskPhone(e.target.value);
      validatePhone(e.target);
    });
    input.addEventListener("blur", (e) => validatePhone(e.target));
  });

  form
    .querySelectorAll("input[required], select[required], textarea[required]")
    .forEach((input) => {
      if (
        input.name !== "nome" &&
        input.name !== "email" &&
        input.name !== "telefone"
      ) {
        input.addEventListener("input", (e) => validateFilled(e.target));
        input.addEventListener("blur", (e) => validateFilled(e.target));
        input.addEventListener("change", (e) => validateFilled(e.target));
      }
    });

  const feedbackElements = createFeedbackElements(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { success, errorReq, errorFields } = feedbackElements;

    try {
      if (isFormValid(form)) {
        const submit = form.querySelector("[type='submit']");
        const originalValue = submit.value || submit.textContent;

        submit.disabled = true;
        if (submit.tagName === "INPUT") {
          submit.value = "Enviando...";
        } else {
          submit.textContent = "Enviando...";
        }

        const formData = new FormData(form);
        formData.append("href", window.location.href);
        formData.append("pathname", window.location.pathname);
        formData.append("utm_medium", getLocalStorage("utm_medium"));
        formData.append("utm_source", getLocalStorage("utm_source"));
        formData.append("utm_campaign", getLocalStorage("utm_campaign"));
        formData.append("utm_content", getLocalStorage("utm_content"));
        formData.append("fbclid", getLocalStorage("fbclid"));
        formData.append("gclid", getLocalStorage("gclid"));

        const webhook = "";

        const response = await fetch(webhook, {
          method: "POST",
          body: formData,
        });

        let telefone = formData.get("telefone");
        if (telefone) {
          telefone = telefone.replace(/\D/g, "");
          if (telefone.length >= 10 && !telefone.startsWith("55")) {
            telefone = "+55" + telefone;
          } else if (telefone.length >= 12 && telefone.startsWith("55")) {
            telefone = "+" + telefone;
          }
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "formSubmitData",
          formData: {
            nome: formData.get("nome"),
            email: formData.get("email"),
            telefone: formData.get("telefone"),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        form.reset();

        form.querySelectorAll(".valid, .invalid").forEach((el) => {
          el.classList.remove("valid", "invalid");
        });

        submit.disabled = false;
        if (submit.tagName === "INPUT") {
          submit.value = originalValue;
        } else {
          submit.textContent = originalValue;
        }

        success.style.display = "block";
        errorFields.style.display = "none";
        errorReq.style.display = "none";

        if (url) window.open(url, "_blank");
      } else {
        success.style.display = "none";
        errorFields.style.display = "block";
        errorReq.style.display = "none";
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      const submit = form.querySelector("[type='submit']");
      const originalValue = submit.value || submit.textContent;
      submit.disabled = false;
      if (submit.tagName === "INPUT") {
        submit.value = originalValue;
      } else {
        submit.textContent = originalValue;
      }

      success.style.display = "none";
      errorFields.style.display = "none";
      errorReq.style.display = "block";
    }
  });
});

// BACK TO TOP
document.querySelector("[data-top]")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ANIMATIONS
(function () {
  'use strict';

  class AniEntrada {
    constructor(options = {}) {
      this.config = {
        threshold:  options.threshold  ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
        once:       options.once       ?? true,
        selector:   options.selector   ?? "[class*='ani-']",
        waveDelay:  options.waveDelay  ?? 40,
      };

      this._prepareWaveElements();
      this._createObserver();
      this._observe();
    }

    _prepareWaveElements() {
      document.querySelectorAll('.ani-wave').forEach(el => {
        if (el.dataset.waveReady) return; // Evita duplicar

        const text = el.textContent;
        el.innerHTML = text
          .split('')
          .map((char, i) => {
            const delay = i * this.config.waveDelay;
            const content = char === ' ' ? '&nbsp;' : char;
            return `<span class="char" style="transition-delay:${delay}ms">${content}</span>`;
          })
          .join('');

        el.dataset.waveReady = 'true';
      });
    }

    _createObserver() {
      this.observer = new IntersectionObserver(
        (entries) => this._handleEntries(entries),
        {
          threshold:  this.config.threshold,
          rootMargin: this.config.rootMargin,
        }
      );
    }

    _observe() {
      this.elements = document.querySelectorAll(this.config.selector);
      this.elements.forEach(el => this.observer.observe(el));
    }

    _handleEntries(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('played');

          if (this.config.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.config.once) {
          entry.target.classList.remove('played');
        }
      });
    }

    replay() {
      this.elements.forEach(el => {
        el.classList.remove('played');
        this.observer.observe(el);
      });
    }

    destroy() {
      this.observer.disconnect();
    }

    add(target) {
      let elements;

      if (typeof target === 'string') {
        elements = document.querySelectorAll(target);
      } else if (target instanceof Element) {
        elements = [target];
      } else if (target instanceof NodeList || Array.isArray(target)) {
        elements = target;
      } else {
        console.warn('[AniEntrada] add(): tipo inválido', target);
        return;
      }

      elements.forEach(el => {
        if (el.classList.contains('ani-wave') && !el.dataset.waveReady) {
          this._prepareWaveElements();
        }
        this.observer.observe(el);
      });
    }

    playNow(el) {
      el.classList.add('played');
    }
  }

  function autoInit() {
    window.aniEntrada = new AniEntrada();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AniEntrada;
  } else if (typeof window !== 'undefined') {
    window.AniEntrada = AniEntrada;
  }

})();