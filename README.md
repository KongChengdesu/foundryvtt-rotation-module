# Token Rotation Lock

Locks token rotation to 90-degree increments (0°, 90°, 180°, 270°). Any rotation outside these angles snaps to the closest allowed angle.

## Features

- **Snap to 90°** — Free rotation, shift-scroll, and config input all snap to nearest 90° increment
- **Per-scene toggle** — Enable or disable rotation lock per scene via the Scene Configuration dialog
- **World defaults** — Set default lock behavior for all scenes, override per scene
- **About Face compatible** — Keeps the [About Face](https://foundryvtt.com/packages/about-face) indicator in sync with snapped rotation

## Settings

| Setting | Scope | Description |
|---|---|---|
| Enable Module | World | Master kill switch |
| Lock by Default | World | Default state for new scenes and scenes not explicitly configured |

### Scene Configuration

A **Token Rotation Lock** checkbox in the Scene Configuration dialog overrides the world default for that scene.

## Compatibility

- Foundry VTT v14+
- Compatible with [About Face](https://foundryvtt.com/packages/about-face)

## License

See [LICENSE](LICENSE).
