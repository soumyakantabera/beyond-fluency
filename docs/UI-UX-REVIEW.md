# Beyond Fluency Lab: UI/UX review

7 September 2026. Scope: typography, grid density, surface treatment, motion, responsive behaviour and brand distinction. This is desk research and implementation review, not a user study or a claim of measured conversion improvement.

## Decision

Restore the original editorial layout, photograph dimensions and square-edged surfaces. Increase text sizes independently. The previous Material-inspired revision unnecessarily changed four course columns into two, enlarged photography and introduced rounded, elevated surfaces. Those changes were outside the requested typography adjustment.

The operating design baseline is the international emerald edition before those changes. The user's stated preference is authoritative; research does not establish that rounded cards are universally better than square ones.

## Evidence and application

| Area | Evidence | Application |
| --- | --- | --- |
| Visual hierarchy | Nielsen Norman Group describes hierarchy through contrast, scale and grouping, and cautions against too many equally prominent elements. | Preserve headline hierarchy and compact course comparison. Increase navigation and small text without increasing all headings, images and containers together. |
| Grid density | IBM Carbon's grid guidance treats gutters and separation as responses to content relationships. | Restore four equal desktop course columns, then two and one at existing smaller breakpoints. Keep original padding and photo heights. Do not add decorative empty space to cards. |
| Resizing and reflow | WCAG 1.4.4 calls for text resizing to 200% without loss; 1.4.10 addresses reflow at 320 CSS pixels. | Allow wrapping, use flexible layouts and avoid fixed text-container heights. Longer text may increase a card's natural height; do not clip it to reproduce an old screenshot. |
| Text spacing | WCAG 1.4.12 describes user spacing overrides that content must tolerate, including 1.5 line height and expanded letter/word spacing. | Keep readable line spacing, reduce aggressive tracking on small labels, and avoid hiding overflow on prose. |
| Pointer targets | WCAG 2.5.8 specifies a 24 × 24 CSS-pixel minimum subject to exceptions. | Keep substantial button hit areas and visible focus outlines. Compact presentation does not require tiny controls. |
| Motion | Carbon distinguishes task-supporting motion from expressive transitions and asks whether motion is purposeful and unobtrusive. | Keep one brief hero introduction; remove card lifting and decorative ripples. Honour OS reduced motion and the site pause control. |
| Brand distinction | FutureLearn uses an ascending staircase motif, visible in its public brand assets. | Retire the stepped logo rather than changing its colour. Use a typographic bf signature with the existing serif wordmark, without stairs, ascending bars or an arrow. This is a visual design choice, not a trademark clearance opinion. |

## Applied specification

- Navigation: 17px; body and primary prose: generally 16–17px.
- Small text: authored CSS floor of 14px (10.5pt), not a WCAG-mandated minimum.
- Course cards: original four-column desktop layout and 168px desktop photographs; original responsive dimensions retained.
- Corners: square on cards, image frames, buttons, forms and panels. No added elevation shadows.
- Imagery: use the existing finished images, at their prior dimensions. No new placeholder panels.
- Intro: approximately 0.6–0.8 seconds, with small stagger; no loading overlay and no interaction lock.
- Identity: outlined, licensed-font bf typography; same asset used in navigation, footer, favicon and print kit.

## Sources

1. [NN/g — Visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
2. [IBM Carbon — 2x grid](https://carbondesignsystem.com/elements/2x-grid/overview/)
3. [IBM Carbon — Typography style strategies](https://carbondesignsystem.com/elements/typography/style-strategies/)
4. [W3C — Resize text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text)
5. [W3C — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)
6. [W3C — Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
7. [W3C — Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
8. [IBM Carbon — Motion evaluation checklist](https://carbondesignsystem.com/elements/motion/resources/)
9. [FutureLearn — Official website](https://www.futurelearn.com/)

## Validation limits

Code checks can verify the type build, declared font sizes, restored grid declarations and static page metadata. They do not establish user preference, cross-device visual quality or full WCAG conformance. No user testing, conversion experiment or browser visual audit is represented as completed here.


## 7 September 2026 — identity and compact mobile refinement
Original paired-rail ladder mark with three rungs; two-line Beyond Fluency / Lab wordmark. Newsreader headlines and Inter body/navigation are self-hosted, with licences bundled. Square desktop card proportions remain. At widths up to 580px, courses and general guide collections use manual vertical transitions, previous/next controls and Show all; four audience-specific guides remain equally visible. No autoplay; reduced-motion and the site motion preference disable transitions. Body copy is 16–17px, form fields 16px, navigation 16–17px. Origin is described on About only; testimonial provenance remains explicit. Official Stripe, Visa and Mastercard artwork identifies planned options, not an active checkout.
