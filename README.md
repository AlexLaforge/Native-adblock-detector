# Native Adblock Detector

##Instruction
1. Run `npm install`.
1. Create `settings.json` configuration file. There is an example file 'settings.json.example', copy/paste and change all necessary attributes.
1. Run `gulp build`.
1. Copy `./build/script.js`, wrap code into `<script>` tag and paste to the <head>...</head> section of your website.

Optional: If you want show warning & redirect when Javascript disabled, add below code to html file.

```
<noscript>
  <div style="position: fixed;z-index: 1000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgba(0, 0, 0, 0.4);">
    <div style="background-color: #fefefe;margin: 10% auto;padding: 20px;border: 1px solid #888;width: 550px;text-align: center;">
      Your browser does not support JavaScript!
    </div>
  </div>
  <meta HTTP-EQUIV="REFRESH" content="0; url=<YOUR_URL>"/>
</noscript
```
