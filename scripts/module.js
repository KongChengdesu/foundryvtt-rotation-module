const MODULE_ID = "token-rotation-lock";

/**
 * Snap a rotation angle to the nearest 90-degree increment.
 * @param {number} degrees - The rotation in degrees.
 * @returns {number} Rotation snapped to 0, 90, 180, or 270.
 */
function snapRotation(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  return Math.round(normalized / 90) * 90;
}

/**
 * Check whether rotation lock is active for a given scene.
 * Scene flag takes priority; falls back to world default setting.
 * @param {Scene} scene
 * @returns {boolean}
 */
function isRotationLocked(scene) {
  if (!scene) return true;
  const flag = scene.getFlag(MODULE_ID, "rotationLock");
  if (flag !== undefined) return flag;
  return game.settings.get(MODULE_ID, "defaultLocked");
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "enabled", {
    name: game.i18n.localize("TOKENROTATIONLOCK.EnabledName"),
    hint: game.i18n.localize("TOKENROTATIONLOCK.EnabledHint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "defaultLocked", {
    name: game.i18n.localize("TOKENROTATIONLOCK.DefaultLockedName"),
    hint: game.i18n.localize("TOKENROTATIONLOCK.DefaultLockedHint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.on("preUpdateToken", (tokenDoc, changes, options, userId) => {
  if (!game.settings.get(MODULE_ID, "enabled")) return;
  if (changes.rotation === undefined || changes.rotation === null) return;

  const scene = tokenDoc.parent;
  if (!isRotationLocked(scene)) return;

  changes.rotation = snapRotation(changes.rotation);
});

Hooks.on("renderSceneConfig", (app, html, data) => {
  const scene = app.document;
  const locked = isRotationLocked(scene);

  const label = game.i18n.localize("TOKENROTATIONLOCK.LockRotation");
  const hint = game.i18n.localize("TOKENROTATIONLOCK.SceneConfigHint");

  const fieldGroup = `
    <fieldset>
      <legend>${game.i18n.localize("TOKENROTATIONLOCK.RotationLock")}</legend>
      <div class="form-group">
        <label for="token-rotation-lock-checkbox">${label}</label>
        <div class="form-fields">
          <input type="checkbox" id="token-rotation-lock-checkbox" name="flags.${MODULE_ID}.rotationLock" ${locked ? "checked" : ""}>
        </div>
        <p class="hint">${hint}</p>
      </div>
    </fieldset>
  `;

  html.find('button[name="submit"]').closest(".sheet-footer").before(fieldGroup);

  // Set form height to accommodate new fieldset
  const currentHeight = parseInt(app.position.height, 10) || 0;
  if (currentHeight > 0) {
    app.setPosition({ height: currentHeight + 60 });
  }
});
