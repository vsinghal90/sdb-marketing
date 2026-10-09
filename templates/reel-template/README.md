# Reel template (9:16 HTML video, 30 seconds)

Reusable source for the Shuddh Desi Bites HTML reel, screen-recorded as a video.

## Files
- reel.template.html: the editable page source with {{placeholders}}. Layout, scenes, timing, voice and music code are all here.
- build.py: embeds the images and writes sdb-reel.html.
- bgp.jpg, logo.png, swiggyw.png, ownly.png, lockup_t.png: brand and partner images. lockup_t.png is the white-tagline lockup; build.py also reads /mnt/project-files/knowledge/LogoNameTagline.png, so run it where that file exists.
- cut/*.webp: dish cut-outs. food/web/*.jpg: framed dish photos.

## Make a new reel
1. Copy this folder to a new folder. Keep the file names.
2. Edit reel.template.html:
   - S array (near the start of the script): d is seconds on screen, en is the spoken English line, rate is voice speed. The durations must add up to 30.
   - Scene markup (the scene sections): on-screen text. Keep text above the photos.
   - Dish photos: data-img names must match a file in cut/ or food/web/.
3. Build: python3 build.py reel.template.html (writes sdb-reel.html).
4. Check: open sdb-reel.html in Chrome or Edge, click "Play a voice test", then play the reel.

## Brand rules
- Logo lockup: name on one line, tagline "Quality meets Value", no "SDB" beside the logo, no corner logo.
- Keep content in the centre of the frame. Scenes auto-fit to the safe zone (fit() function).
- Voice spelling: "Shoodh Deh-see Bites" in the spoken text. Keep the on-screen spelling as the logo has it.
- Background: one petrol-blue colour (#hash options: royal, navy, midnight, indigo).
- Ratings and orders: 5,000+ ratings and 4+ stars at equal size. 20,000+ orders and 10,000+ customers come first.
- Labels: "Other loved items", not "Also on the menu".

## Known limits
- Voice uses the browser's speech voices. It is silent in headless browsers and may be blocked in preview panes; open the built file directly in Chrome or Edge.
- Scenes that are too tall are scaled down to fit, so keep copy short.
