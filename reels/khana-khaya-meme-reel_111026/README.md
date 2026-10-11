# Meme reel generator (draft, 9:16)

Meme-format reels for people from North, West and East India living in Bengaluru. HTML only until the owner says a reel is final.

## How it works
- `meme.template.html` is the meme format (scenes, camera shots, sound, captions). `specs/<meme>.json` holds the words, voice lines and dish for each regional version (north, east, west). One page carries all versions; `#north`, `#east`, `#west` on the link (or the buttons on the start screen) pick one.
- Voices: `python3 make_voices.py <kokoro model dir> specs/<meme>.json` (offline Kokoro Hindi TTS; mummy is `hf_alpha`, "me" is `hm_psi`). Files land in `voice/<slug>/<version>_<line>.wav`.
- Background: every meme draws its own backdrop (owner, 2026-10-11), named in the spec as `"background": "backgrounds/<meme>-<scene>.svg"` and shared by its North, East and West versions. build.py refuses a spec without one, or one that reuses another meme's file. Keep it vibrant, suited to the meme's scene, and different from the reels already out (petrol blue, phthalo green, terracotta, the parody's night flyover, the neon nightclub, the hockey dressing room). Khana khaya? uses a rani-pink PG room with marigold curtains, a teal window and a rainy city with a metro train passing.
- Build: `python3 build.py specs/<meme>.json` writes `<slug>.html`. Frame check: `#north&t=12&safe` freezes a frame with the safe zone shown.
- Same rules as the parody reels: safe zone (top 14%, bottom 28%, sides 12%), captions at 23-45% of the frame height, phone and food at 45-60%, a cut every 1 to 2.5s, captions stay on for muted viewers, sound logo on the end card, approved claims only, no prices, no third-party meme images, film clips or trending audio, affectionate humour with no digs at any region, language, religion or cuisine.

## Sample 1: "Khana khaya?" (POV phone call, expectation vs reality), about 26s
Artifact: https://claude.ai/artifact/QqG4HsKDBZcH9feRGbRtzr (built 2026-10-11)
1. Hook (0-2.4s): the phone rings "Mummy calling…" from frame one; "POV: You moved to Bengaluru and it's 9:47 PM".
2. Mummy: "Beta, khana khaya?" (spoken, call waves move).
3. Me: "Haan mummy, dal, sabzi, roti… sab khaya" with a thought bubble of a full thali.
4. Record scratch: "Reality: 2 biscuit aur ek chai" (sad unbranded biscuits and a cutting chai).
5. Mummy: "Jhooth mat bolo. Awaaz se pata chal jaata hai." Red glow, heartbeat; cutaway to the sweating biscuits.
6. Plan B: doorbell, door opens, the real paratha meal slams in with rays and steam, chip "Cooked in our kitchen every day".
7. Video call: mummy sees the meal, "Haan, ab hua na ghar jaisa khana!", hearts float.
8. Prompt card: "Sabki mummy same hai na?", "Tag the friend whose mummy calls at 9 PM", "Comment your mummy's line".
9. End card: "Parathas rolled and cooked hot when you order", lockup on the sound logo, "Available on".
10. Loop (0.8s): the phone rings again under the end card, so the replay flows straight into the opening ring.

Regional versions: North (Mummy, paneer paratha meal), East (Maa, "Babu, khana khaye?", "daal-bhaat", sattu paratha meal), West (Gujarati-flavoured "jamyo ke nahi?", "badhu khadhu", aloo paratha meal). The Gujarati and Bihari lines need a native speaker's check.

## Meme format menu (for the next ones)
1. POV phone call: "Khana khaya?" (built).
2. Expectation vs reality: "Ghar ka aloo paratha vs PG ka aloo paratha".
3. Nobody / Me: "Nobody: · Me at 11 PM in Bengaluru: craving mummy ke haath jaisa paratha".
4. Two-button choice: a sweating character choosing between "Cook after a 2-hour commute" and "Order a hot paratha".
5. Starter pack: "Bengaluru PG starter pack" (umbrella, traffic app, Maggi, missing home food).
6. Types of flatmates when the food arrives: the sniffer, the "ek bite", the photographer.
7. "Tell me you're from Bihar / UP / Gujarat without telling me": sattu, achaar, thepla-in-luggage jokes, ending on the matching dish.
8. Silk Board traffic vs our tawa: "Traffic moves slow. Parathas don't wait: rolled and cooked when you order."
