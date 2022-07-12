const lang = {
    EN: "en",
    ES: "es",
    FR: "fr"
}
const defaultLocale = lang.EN;

let locale;
var translations = {};

function initTranslationSettings() {
    $("#i18n-mobile-toggle").click(function () { 
        $("#i18n-mobile-dropdown").toggleClass("no-display");
    })
    $("#i18n-desktop-toggle").click(function () { 
        $("#i18n-desktop-dropdown").toggleClass("no-display");
    })

    $(".i18n-en").click(function () { setLocale(lang.EN) })
    $(".i18n-es").click(function () { setLocale(lang.ES) })
    $(".i18n-fr").click(function () { setLocale(lang.FR) })
    setLocale(defaultLocale);
}

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

// Get translation json object
async function fetchTranslationsFor(newLocale) {
    return $.getJSON(`https://identity-idva-static-assets-${ENVIRONMENT_NAME}.app.cloud.gov/js/locale/languages/${newLocale}.json`, function (data) {
        console.log(data);
        return data;
    });
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = getElement(key);
    element.innerHTML = translation;
}

// use Array Reduce to recursively fetch dynamic json keys
function getElement(nest) {
    return nest.split('.').reduce(function (o, k) {
        return o && o[k];
    }, translations[locale])
}
