# Firebot Script: Time Until

A Firebot custom script to show in chat how long until a given time

### End-user install
1. Download `TimeUntil.js` from the `dist/` directory or from GitHub releases section
2. In Firebot, make a new !command
3. Set the trigger, cooldown, aliases, etc to whatever you'd like
4. Under Base Effects, add new effect, then "Run Custom Script"
   - If you don't see this option, ensure that "Custom Scripts" is enabled in Settings > Scripts
5. Click on the "scripts folder" link in this dialog
6. Copy `TimeUntil.js` into this folder
7. Click the refresh icon next to the Pick One dropdown
8. Select `TimeUntil.js`
9. Enter the target date, message and who to send the message as
10. Click Add, then Save
11. Test it out


**A note on %rDays vs %days:**

The non-prefixed components round up while the r-prefixed components do not. The difference is subtle, so here is an example: 
If today is May 5th and your birthday is on the 10th, you'd say "There are 5 days until my birthday" or, if you're a very precise person,
"My birthday is in 4 days, 8 hours". If your command looks like the former, use %days; with the latter, use %rDays/%rMinutes. 

### Building

Run `npm install`

Dev:
1. `npm run build:dev`
- Automatically copies the compiled .js to Firebot's scripts folder.

Release:
1. `npm run build`
- Copy .js from `/dist`
