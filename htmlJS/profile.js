import { getIdentity, getWork, getContact, getSupportedLocales } from "./profile.dev.js";

const profileNameEl = document.getElementById("profileName");
const profileRoleEl = document.getElementById("profileRole");
const profilePhoneEl = document.getElementById("profilePhone");
const eyebrowTextEl = document.getElementById("eyebrowText");
const labelNameEl = document.getElementById("labelName");
const labelRoleEl = document.getElementById("labelRole");
const labelPhoneEl = document.getElementById("labelPhone");
const labelQrEl = document.getElementById("labelQr");
const qrEl = document.getElementById("contactQr");
const qrCaptionEl = document.getElementById("qrCaption");
const qrPhoneNoteEl = document.getElementById("qrPhoneNote");
const localeButtons = document.querySelectorAll(".locale-btn");

const supportedLocales = getSupportedLocales();
const uiText = {
  en: {
    htmlLang: "en",
    eyebrow: "BUSINESS PROFILE",
    labelName: "NAME",
    labelRole: "ROLE",
    labelPhone: "PHONE",
    labelQr: "QR CODE",
    qrAria: "Phone contact QR code",
    qrAlt: "QR code for saving phone contact",
    qrCaption: "This QR code adds my phone number to your contacts.",
    phonePrefix: "PHONE",
    phoneUnavailable: "Not available"
  },
  fr: {
    htmlLang: "fr",
    eyebrow: "PROFIL PROFESSIONNEL",
    labelName: "NOM",
    labelRole: "POSTE",
    labelPhone: "TELEPHONE",
    labelQr: "CODE QR",
    qrAria: "Code QR pour ajouter le contact telephonique",
    qrAlt: "Code QR pour enregistrer le numero de telephone",
    qrCaption: "Ce code QR ajoute mon numero de telephone a vos contacts.",
    phonePrefix: "TELEPHONE",
    phoneUnavailable: "Non disponible"
  }
};

let cachedIdentity = null;
let cachedContact = null;
let currentLocale = "en";

function resolveLocale(locale) {
  if (supportedLocales.includes(locale)) {
    return locale;
  }

  return "en";
}

function renderLabels(locale) {
  const text = uiText[locale];

  document.documentElement.lang = text.htmlLang;

  if (eyebrowTextEl) {
    eyebrowTextEl.textContent = text.eyebrow;
  }

  if (labelNameEl) {
    labelNameEl.textContent = text.labelName;
  }

  if (labelRoleEl) {
    labelRoleEl.textContent = text.labelRole;
  }

  if (labelPhoneEl) {
    labelPhoneEl.textContent = text.labelPhone;
  }

  if (labelQrEl) {
    labelQrEl.textContent = text.labelQr;
  }

  localeButtons.forEach((button) => {
    const isActive = button.dataset.locale === locale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function renderProfile(locale) {
  const identity = getIdentity(locale);
  const work = getWork(locale);
  const contact = getContact(locale);

  cachedIdentity = identity;
  cachedContact = contact;

  if (profileNameEl && identity.name) {
    profileNameEl.textContent = identity.name;
  }

  if (profileRoleEl && work.role) {
    profileRoleEl.textContent = work.role;
  }

  if (profilePhoneEl && contact.phone) {
    profilePhoneEl.textContent = contact.phone;
  }
}

function buildContactQr(locale) {
  if (!qrEl) {
    return;
  }

  const text = uiText[locale];
  const personName = (cachedIdentity && cachedIdentity.name) || "Profile Contact";
  const phone = (cachedContact && cachedContact.phone) || "";
  const normalizedPhone = phone.replace(/\s+/g, "").trim();
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${personName}`,
    `TEL;TYPE=CELL:${normalizedPhone}`,
    "END:VCARD"
  ].join("\n");
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(vCard)}`;

  qrEl.textContent = "";
  qrEl.setAttribute("aria-label", text.qrAria);

  const qrImage = document.createElement("img");
  qrImage.className = "qr-image";
  qrImage.alt = text.qrAlt;
  qrImage.src = qrSrc;
  qrEl.appendChild(qrImage);

  if (qrCaptionEl) {
    qrCaptionEl.textContent = text.qrCaption;
  }

  if (qrPhoneNoteEl) {
    qrPhoneNoteEl.textContent = normalizedPhone
      ? `${text.phonePrefix}: ${normalizedPhone}`
      : `${text.phonePrefix}: ${text.phoneUnavailable}`;
  }
}

function applyLocale(locale) {
  currentLocale = resolveLocale(locale);
  renderLabels(currentLocale);
  renderProfile(currentLocale);
  buildContactQr(currentLocale);
}

localeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLocale(button.dataset.locale || "en");
  });
});

applyLocale(currentLocale);
