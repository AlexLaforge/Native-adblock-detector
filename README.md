# Native Adblock Detector

##Important

License is The GNU General Public License v3.0. If you like to use this code for commercial uses (recover ad revenue on your website or app) and do not want to open and distribute your code, contact me at tima@getdrizzle.com to buy commercial license. Commercial license includes analytics app (https://vimeo.com/206459892), which allows you to monitor number of Adblock users and number of users who decided to turn off Adblock on your website or app.

##Demo

Go to this page with enabled Adblock, scroll page:
http://asiatoworld.com/2016/07/17/china-unveils-giant-sculpture-of-chinese-god-of-war-guan-yu/

##Why we build this detector.

Short answer:
- Publishers and content creators with great content lose revenue and go out of business. Readers are willing to whitelist website or pause Adblock in exchange for great content. Most publishers and content creators have never communicated with visitors directly. Thus this product.
- Most of publishers and content creators do not know how to implement paywall and membership systems, adblock detector is much easier to implement and it is easier to turn off Adblock than to pay.

Having said, there are many things to consider while implementing detector. We put the best user experience and technology practices into this detector.
- Adblock, Adblock Plus and other extensions can block detectors which are implemented via external JS code (adblocking is done via blacklisting external resources). Thus we implemented detector natively.
- Popups are fundamentally evil for user experience. Plus Google punishes SEO of websites with popups. This detector allows visitors to read content and scroll pages for X number of pixels. X is set by website owner. This teaser approach reduces bounce rate by 2X and increase conversion rate by 2X, without hurting site's SEO.


Long answer can be found here:
- https://medium.com/@getdrizzle/adblock-detection-technical-and-ux-considerations-12731873c0df#.uuxv21b0f
- https://medium.com/@getdrizzle/big-shifts-in-online-content-monetization-bdebd920bf4b#.ecw88igpq

##Is it for you?
Good framework to decide is to ask yourself questions: 
"Will I pay for content on my website?"
"Can I find content similar to mine somewhere else and it's free?". 
If answer is No/Yes, then you should not use this detector.


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

##Settings
Specify settings so footer bar with message matches your brand. You can modify text, colors and add extra buttons to the bar. Text can modified so you can use languages other than English.

Three important attributes are `canClose`, `urlRules` and `excludeUrlRules`.
`canClose` - set to false if you want to prevent visitors from closing footer bar with message.
`urlRules` - list URLs on where you want to show detector. `example.com/.+` shows detector on all pages except homepage.
`excludeUrlRules`- list URLs where you do not want to show detector. `example.com/newsletter` does not show detector on that page.

```
{
  "pixel": 400,
  "uiConfig": {
    "callToActionText": "Ads help us create great content. Please pause Adblock or whitelist our domain.",
    "buttonText": "OK, I turned off Adblock",
    "buttonBackgroundColor": "#4cad41",
    "footerBackgroundColor": "#0095e8",
    "canClose": true,
    "font": "Lato",
    "showDarkScreen":  true,
    "modalTitle": "How to turn off",
    "mobileModalTitle": "How to turn off on Mobile",
    "afterCheckText": "Your Adblock is still enabled. Please see above instructions."
  },
  "extraButtonConfig": {
    "isEnabled": true,
    "buttonText": "Become a member",
    "buttonBackgroundColor": "#4cad41",
    "destinationURL": "https://github.com/tima101/Native-adblock-detector"
  },
  "extraButton2Config": {
    "isEnabled": false,
    "buttonText": "Go2 ad-free for $1/mo",
    "buttonBackgroundColor": "#4fad41",
    "destinationURL": "https://facebook.com/"
  },
  "urlRules": [
    "http://example.com/.+"
  ],
  "excludeUrlRules": []
}
```
Here are settings.json file for this page: http://asiatoworld.com/2016/07/17/china-unveils-giant-sculpture-of-chinese-god-of-war-guan-yu/

```
{
  "pixel": 400,
  "uiConfig": {
    "callToActionText": "Ads help us create great content. Please pause Adblock or whitelist our domain.",
    "buttonText": "OK, I turned off Adblock",
    "buttonBackgroundColor": "#4cad41",
    "footerBackgroundColor": "#0095e8",
    "canClose": true,
    "font": "Lato",
    "showDarkScreen":  true,
    "modalTitle": "How to turn off",
    "mobileModalTitle": "How to turn off on Mobile",
    "afterCheckText": "Your Adblock is still enabled. Please see above instructions."
  },
  "extraButtonConfig": {
    "isEnabled": true,
    "buttonText": "Become a member",
    "buttonBackgroundColor": "#4cad41",
    "destinationURL": "https://github.com/tima101/Native-adblock-detector"
  },
  "extraButton2Config": {
    "isEnabled": false,
    "buttonText": "Extra button",
    "buttonBackgroundColor": "#4fad41",
    "destinationURL": "https://facebook.com/"
  },
  "urlRules": [
    "http://asiatoworld.com/.+"
  ],
  "excludeUrlRules": []
}
```
