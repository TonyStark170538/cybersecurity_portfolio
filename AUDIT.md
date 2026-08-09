# Accessibility & Performance Audit

**Date:** August 9, 2026
**Project:** Cybersecurity Portfolio
**Deployment:** `cybersecurity-portfolio-snowy.vercel.app`
**Audit:** Lighthouse Mobile + WAVE + keyboard-only review

---

## 1. Baseline

The initial Lighthouse mobile audit was captured on August 9, 2026 at 12:44 PM GMT+2 using Lighthouse 13.4.1 with an emulated Moto G Power and slow 4G throttling.

| Category       |     Before |
| -------------- | ---------: |
| Performance    |     **53** |
| Accessibility  |     **82** |
| Best Practices |     **96** |
| SEO            |     **82** |
| CLS            |      **0** |
| FCP            |  **4.3 s** |
| LCP            | **13.5 s** |
| TBT            | **340 ms** |
| Speed Index    |  **6.5 s** |

### Baseline findings

#### Performance

* LCP was **13.5 s**, significantly above the target of 2.5 s.
* FCP was **4.3 s**.
* The main JavaScript bundle was approximately **430 KiB**.
* Lighthouse estimated approximately **260 KiB of unused JavaScript**.
* A **1.5 MiB HDR asset** was loaded from a third-party GitHub asset host.
* Six long main-thread tasks were detected.
* JavaScript CPU time was approximately **1.2 s**.
* Render-blocking requests were estimated to delay rendering by approximately **1.3 s**.
* The production `robot.glb` asset failed to load.

#### Accessibility

The baseline accessibility score was **82**.

The automated audit identified:

* Missing `<main>` landmark.
* Mobile viewport configuration uses `maximum-scale=1`, which prevents normal user zooming.

Manual accessibility checks were also required for:

* Keyboard focusability.
* Visible focus indicators.
* Logical tab order.
* Focus management.
* Landmark structure.
* Accessible names for custom controls.
* Image alternative text.
* Form labels.
* AI/chat interaction accessibility.

---

## 2. Changes

### Accessibility

* [ ] Add a semantic `<main>` landmark.
* [ ] Add a keyboard-accessible skip link.
* [ ] Remove `maximum-scale=1` from the viewport meta tag.
* [ ] Verify all buttons and links have accessible names.
* [ ] Add visible `:focus-visible` states.
* [ ] Verify logical keyboard tab order.
* [ ] Add/verify meaningful `alt` text.
* [ ] Add labels to form inputs.
* [ ] Verify dialogs and interactive components can be entered and exited with the keyboard.
* [ ] Add `aria-live="polite"` to streamed AI output.
* [ ] Add a keyboard-reachable Stop AI response button.
* [ ] Verify the primary flow can be completed without a mouse.
* [ ] Respect `prefers-reduced-motion`.

### Performance

* [ ] Fix the production `robot.glb` loading error.
* [ ] Lazy-load the 3D scene where appropriate.
* [ ] Reduce or replace the 1.5 MiB HDR asset.
* [ ] Reduce the initial JavaScript bundle.
* [ ] Defer non-critical JavaScript.
* [ ] Optimize font loading.
* [ ] Review render-blocking resources.
* [ ] Verify image dimensions and responsive image sizing.
* [ ] Re-run Lighthouse after each significant performance change.

### WAVE

* [ ] Run WAVE on the homepage.
* [ ] Run WAVE on the primary project/portfolio page.
* [ ] Run WAVE on the AI/chat interface.
* [ ] Fix all WAVE errors.
* [ ] Review and document any alerts that are intentionally acceptable.

---

## 3. After Audit

The audit will be re-run using the same Lighthouse mobile configuration to make the before/after comparison measurable.

| Category       | Before |   After |   Delta |
| -------------- | -----: | ------: | ------: |
| Performance    |     53 | **TBD** | **TBD** |
| Accessibility  |     82 | **TBD** | **TBD** |
| Best Practices |     96 | **TBD** | **TBD** |
| SEO            |     82 | **TBD** | **TBD** |
| FCP            |  4.3 s | **TBD** | **TBD** |
| LCP            | 13.5 s | **TBD** | **TBD** |
| TBT            | 340 ms | **TBD** | **TBD** |
| CLS            |      0 | **TBD** | **TBD** |

### WAVE result

| Page         | Errors Before | Errors After |
| ------------ | ------------: | -----------: |
| Homepage     |           TBD |        **0** |
| Primary flow |           TBD |        **0** |
| AI/chat      |           TBD |        **0** |

### Keyboard-only verification

The primary user flow was tested using keyboard input only.

* [ ] Navigation can be completed with Tab/Shift+Tab.
* [ ] Buttons can be activated with Enter/Space.
* [ ] Focus indicators are visible.
* [ ] Chat input is keyboard accessible.
* [ ] AI response controls are keyboard accessible.
* [ ] Stop button is keyboard reachable.
* [ ] Focus is not trapped unexpectedly.
* [ ] Escape closes dismissible UI where applicable.

---

## 4. Final Status

### Target

* Lighthouse Performance: **90+**
* Lighthouse Accessibility: **90+**
* WAVE: **0 errors**
* Primary flow: **100% keyboard completable**
* AI streamed output: **polite live announcement**
* AI stop control: **keyboard reachable**
* Before/after Lighthouse results documented with screenshots.

**Status:** In progress.
