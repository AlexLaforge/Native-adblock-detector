# Native Adblock Detector

##Important

License is The GNU General Public License v3.0. If you like to use this code for commercial uses (recover ad revenue on your website or app) and do not want to open and distribute your code, contact me at tima@getdrizzle.com to buy commercial license. Commercial license includes analytics app (https://vimeo.com/206459892), which allows you to monitor number of Adblock users and number of users who decided to turn off Adblock on your website or app.

##Why we build this detector.
Short answer:

Long answer can be found here:
1. https://medium.com/@getdrizzle/adblock-detection-technical-and-ux-considerations-12731873c0df#.uuxv21b0f
1. https://medium.com/@getdrizzle/big-shifts-in-online-content-monetization-bdebd920bf4b#.ecw88igpq

##Is it for you?



##How to install
1. Run `npm install`.
1. Create `settings.json` configuration file. There is an example file 'settings.json.example', copy/paste and change all necessary attributes.
1. Run `gulp build`.
1. Copy `./build/script.js`, wrap code into `<script>` tag and paste to the `<head>...</head>` section of your website.

You can use Google Tag Manager to add code to your website.
If you are using Wordpress, you can paste code into "Scripts (for the head element)" field of this plugin: https://wordpress.org/plugins/scripts-n-styles/. Do not wrap code in `<script>` tag, if you are using this plugin.

Optional: If you want show warning & redirect when Javascript disabled, add below snippet to `<head>...</head>` or `<body>...</body>` section of your website.

```
<noscript>
  <div style="position: fixed;z-index: 1000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0, 0, 0, 0.4);">
    <div style="background-color: #fefefe;margin: 10% auto;padding: 20px;border: 1px solid #888;width: 550px;text-align: center;">
      Enable JavaScript to access content on this website.
    </div>
  </div>
  <meta HTTP-EQUIV="REFRESH" content="0; url=<YOUR_URL>"/>
</noscript
```
