async function removeLikes(maxCycles = 10, DEBUG=false) {

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const log = (msg, type = "info") => {
    const t = new Date().toLocaleTimeString();
    const prefix = {
      info: "🟢",
      warn: "⚠️",
      error: "🔴",
      action: "🔹",
      debug: "🧪"
    }[type] || "ℹ️";
    console.log(`${prefix} [${t}] ${msg}`);
  };

  function isVisible(el) {
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return (
      r.width > 0 &&
      r.height > 0 &&
      style.visibility !== "hidden" &&
      style.display !== "none" &&
      style.pointerEvents !== "none"
    );
  }

  function debugElement(el) {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if(DEBUG) log(
      `Candidat → tag=${el.tagName}, role=${el.getAttribute("role")}, ` +
      `aria-label=${el.getAttribute("aria-label")}, ` +
      `pointer-events=${s.pointerEvents}, visible=${isVisible(el)}, ` +
      `rect=${Math.round(r.width)}x${Math.round(r.height)}`,
      "debug"
    );
  }

  function clickFirstUnlike() {
    if(DEBUG) log("Scan des boutons Bloks (premier 'Je n’aime plus')...", "action");

    const candidates = document.querySelectorAll(
      '[role="button"][aria-label="Je n’aime plus"]'
    );

    if(DEBUG) log(`Candidats trouvés : ${candidates.length}`, "debug");

    for (const el of candidates) {
      debugElement(el);

      if (!isVisible(el)) {
        if(DEBUG) log("⛔ Ignoré : non cliquable / invisible", "debug");
        continue;
      }

      el.scrollIntoView({ block: "center" });
      el.click();

      if(DEBUG) log("✅ Premier bouton 'Je n’aime plus' cliqué", "info");
      return true;
    }

    return false;
  }

  async function waitForConfirmButton(timeout = 4000) {
    const start = performance.now();

    while (performance.now() - start < timeout) {
      const btn = [...document.querySelectorAll("button")]
        .find(b => b.textContent.trim() === "Je n’aime plus");

      if (btn && isVisible(btn)) {
        if(DEBUG) log("Bouton de confirmation détecté", "debug");
        return btn;
      }

      await delay(200);
    }

    return null;
  }

  async function clickConfirmUnlike() {
    if(DEBUG) log("Recherche du bouton de confirmation 'Je n’aime plus'...", "action");

    const btn = await waitForConfirmButton();

    if (!btn) return false;

    debugElement(btn);
    btn.scrollIntoView({ block: "center" });
    btn.click();

    if(DEBUG) log("🥀 Confirmation 'Je n’aime plus' cliquée", "info");
    return true;
  }
  
  async function clickToRefreshBatch() {
    if(DEBUG) log("Rafraichissement de la liste des publications...", "action");
    const selectButton = [...document.querySelectorAll("span, div")]
      .find(el => el.textContent.trim() === "Commentaires");
    if (!selectButton) {
      if(DEBUG) log("Bouton 'Commentaires' introuvable", "error");
      return false;
    }
    debugElement(selectButton);
    selectButton.click();
    await delay(3000);

    if(DEBUG) log("Passage sur la page de commentaires pour rafraichissement...", "info");
    const postsButton = [...document.querySelectorAll("span, div")]
      .find(el => el.textContent.trim() === "J’aime");
    if (!postsButton) {
      if(DEBUG) log("Bouton 'J’aime' introuvable", "error");
      return false;
    }
    debugElement(postsButton);
    postsButton.click();
    await delay(10000);
    if(DEBUG) log("Retour sur la page des publications effectué", "info");


    if(DEBUG) log("Triage des publications par 'Plus anciennes'...", "action");

    const sortButton = [...document.querySelectorAll('[role="button"][aria-label="Trier et filtrer"]')]
      .find(el => getComputedStyle(el).pointerEvents !== 'none');
    if (!sortButton) {
      if(DEBUG) log("Bouton 'Trier' introuvable", "error");
      return false;
    }
    debugElement(sortButton);
    sortButton.click();
    if(DEBUG) log("Menu de tri ouvert", "info");
    await delay(3000);

    if(DEBUG) log("Sélection de l'option 'Du plus ancien au plus récent'...", "action");
    const oldestButton = [...document.querySelectorAll(`[role="button"][aria-label="Du plus ancien au plus récent"]`)]
      .find(el => getComputedStyle(el).pointerEvents !== 'none');
    if (!oldestButton) {
      if(DEBUG) log("Bouton 'Du plus ancien au plus récent' introuvable", "error");
      return false;
    }
    debugElement(oldestButton);
    oldestButton.click();
    await delay(3000);
    if(DEBUG) log("Option 'Plus anciennes' sélectionnée", "info");


    const applyButton = [...document.querySelectorAll(`[role="button"][aria-label="Appliquer"]`)]
      .find(el => getComputedStyle(el).pointerEvents !== 'none');
    if (!applyButton) {
      if(DEBUG) log("Bouton 'Appliquer' introuvable", "error");
      return false;
    }
    debugElement(applyButton);
    applyButton.click();
    await delay(3000);

    if(DEBUG) log("Triage par 'Plus anciennes' effectué", "info");


    return true;
  }

  function scrollOneRow(containerSelector, rowHeight = 130) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        container.scrollBy({ top: rowHeight, behavior: 'smooth' });
        if(DEBUG) log(`🔻 Scroll d'une rangée effectué (${rowHeight}px)`, "debug");
    }

  async function removeBatch(batchNumber) {
    if(DEBUG) log(`--- Début du cycle ${batchNumber} ---`, "action");

    if(DEBUG) log("Recherche du bouton 'Sélectionner'...");
    const selectButton = [...document.querySelectorAll("button, div")]
      .find(el => el.textContent.trim() === "Sélectionner");

    if (!selectButton) {
      if(DEBUG) log("Bouton 'Sélectionner' introuvable", "warn");
      const booltest = await clickToRefreshBatch();
      if(booltest === false){
        if(DEBUG) log("Arrêt du script dû au bouton manquant", "error");
        return false;
      }
      await delay(30000);
      if(DEBUG) log("Nouvelle tentative de recherche du bouton 'Sélectionner'...");
      const newSelectButton = [...document.querySelectorAll("button, div")]
        .find(el => el.textContent.trim() === "Sélectionner");

      debugElement(newSelectButton);
      newSelectButton.click();
      if(DEBUG) log("Mode sélection activé");
      await delay(3000);
    }else{
      debugElement(selectButton);
      selectButton.click();
      if(DEBUG) log("Mode sélection activé");
      await delay(3000);
    }

    

    const icons = document.querySelectorAll(
      'div[role="button"][data-bloks-name*="Icon"], div[data-bloks-name*="Icon"]'
    );

    if(DEBUG) log(`Icônes détectées : ${icons.length}`);

    let count = 0;
    for (const icon of icons) {
      if (count >= 18) break;
      if (!isVisible(icon)) continue;

      icon.click();
      count++;
      if(DEBUG) log(`Clic #${count} effectué`, "debug");
      // Scroll toutes les 3 publications
        if (count % 3 === 0) {
            scrollOneRow('div[data-bloks-name="bk.components.Collection"]');
            await delay(800 + Math.random() * 500);
        }
      await delay(Math.random() * 1000);
    }

    if (count === 0) {
      if(DEBUG) log("Aucune publication sélectionnée", "warn");
      return false;
    }

    if(DEBUG) log(`${count} publications sélectionnées`);
    await delay(250);

    if (!clickFirstUnlike()) {
      if(DEBUG) log("Premier bouton 'Je n’aime plus' introuvable", "warn");
      return false;
    }

    await delay(800);

    if (!await clickConfirmUnlike()) {
      if(DEBUG) log("Bouton de confirmation absent", "warn");
      return false;
    }

    log(`Cycle ${batchNumber} terminé (${count} likes retirés)`);
    return true;
  }

  for (let i = 1; i <= maxCycles; i++) {
    const ok = await removeBatch(i);
    if (!ok) {
      log("Arrêt du script", "warn");
      break;
    }

    const pause =100000+Math.random() * 40000;
    log(`Pause ${(pause / 1000).toFixed(1)} s`, "action");
    await delay(pause);

    
  }

  log("Script terminé", "info");
}

// Modifier ici : 
//maxCycles : nombre de répétitions ( 5 => On enlève 5*18 publications)
//DEBUG : permet d'avoir des messages de déboguage ( false | true)
removeLikes(maxCycles = 1, DEBUG = false);
