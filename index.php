<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta content="da" http-equiv="Content-Language">
    <link rel="stylesheet" href="scripts/css-config.css">
    <link rel="stylesheet" href="scripts/styles.css">
    <title>Start page!</title>
  </head>
  <body>
    <div>
      <img class="hero-image">
      <img class="hero-loader do-transition">
      <div class="time-container">
        <h1 id="time">9:41</h1>
      </div>
      <div class="hero">
        <main class="box">
          <h1>Skejs.eu!</h1>
          <p class="magic-bar-p"><span class="auto-style1">
            <a href="javascript:magicinfo()" class="auto-style5">Magic bar!: </a></span>
            <input id="magicbar" class="auto-style2" autofocus="" type="text">
          </p><br>
          <p>Hello, and welcome to my website!</p>
          <p>This website is owned by <a href="https://github.com/ObsidianPresidium">ObsidianPresidium</a> (you might also know me as <a href="https://steamcommunity.com/id/SSBhbSBpbiB5b3VyIHdhbGxzLg/">ember!</a>), an aspiring developer and tech enthusiast located in <span title="Denmark!">🇩🇰</span>. You're looking at my start page, which I use as a gateway to the big interwebs. Feel free to look around!</p>
          <p>The background images on this website are pictures taken by me and my friends. You can press Enter when nothing is written into the magic bar to cycle between them</p>
          </main>
          <section class="box" id="links">
            <h1>Links</h1>
            <div class="center-content">
              <div class="links-flexbox">
                <div class="name-and-links-container">
                  <p>Skejs.eu Links</p>
                  <div class="btn-container">
                    <div class="btn" onclick="lnk('https://skejs.eu/files')">Browse files</div>
                  </div>
                </div>
                <div class="name-and-links-container">
                  <p>Other Links</p>
                  <div class="btn-container">
                    <div class="btn" onclick="lnk('https://uncletopia.com/servers')">Uncletopia</div>
                    <div class="btn" onclick="lnk('https://scrap.tf')"> Scrap.TF </div>
                    <div class="btn" onclick="lnk('https://mastodon.nu')"> Mastodon.nu </div>
                    <div class="btn" onclick="lnk('https://hltv.org')"> HLTV </div>
                    <div class="btn" onclick="lnk('https://old.reddit.com')"> Reddit </div>
                    <div class="btn" onclick="lnk('https://app.simplenote.com/login')"> Simplenote </div>
                  </div>
                </div>
                <div class="name-and-links-container">
                  <p>Panels</p>
                  <div class="btn-container">
                    <div class="btn btn-toggle" onclick="panel('translate', this)"> Translator </div>
                    <div class="btn btn-toggle" onclick="panel('generator', this)"> .desktop file generator </div>
                  </div>
                </div>
              </div>
            </div>
            <select onchange="if (this.selectedIndex) twitch(this.selectedIndex)">
              <option value="-1">Twitch.tv</option>
              <option value="1">PGL A</option>
              <option value="2">PGL B</option>
              <option value="3">Blast Premier</option>
              <option value="4">ESL A</option>
              <option value="5">ESL B</option>
              <option value="6">Pinnacle Cup</option>
              <option value="7">74kanm</option>
              <option value="8">Roobet</option>
            </select><p></p>
          </section>
          <section class="box hidden panel" id="translate">
            <h1>Translator</h1>
            <div class="translate-container-container">
            <div class="translate-container">
              <div>
                <h2>Translate this</h2>
                <textarea oninput="translateUpdated()" name="source" id="translate_source" cols="30" rows="10"><?php if (!empty($_POST)) { echo $_POST["string"]; } ?></textarea>
              </div>
              <div>
                <h2>Result</h2>
                <textarea disabled name="output" id="translate_output" cols="30" rows="10"><?php
                if (!empty($_POST)) {
                  $url = "https://api-free.deepl.com/v2/translate";
                  $fields = [
                    "text" => $_POST["string"],
                    "target_lang" => "EN"
                  ];
                  $fields_string = http_build_query($fields);
                  $ch = curl_init();

                  curl_setopt($ch,CURLOPT_URL, $url);
                  curl_setopt($ch,CURLOPT_POST, true);
                  curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
                  curl_setopt($ch,CURLOPT_HTTPHEADER, [rtrim(file_get_contents("/root/deepl_api_key"))]);
                  curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

                  $result = curl_exec($ch);
                  $output = json_decode($result, true)["translations"][0]["text"];
                  curl_close($ch);
                  echo $output;
                }
                ?></textarea>
              </div>
            </div>
          </section>
          <section class="box hidden panel" id="generator">
            <h1>.desktop file generator (alpha!)</h1>
            <div class="generator-container">
              <div class="generator-settings">
                <div class="generator-settings-input">
                  <input type="text" id="generator-input-name" onchange="doGenerate()" placeholder="(*) Name">
                  <input type="text" id="generator-input-desc" onchange="doGenerate()" placeholder="Description">
                  <input type="text" id="generator-input-icon" onchange="doGenerate()" placeholder="(*) Icon Path">
                  <input type="text" id="generator-input-exec" onchange="doGenerate()" placeholder="(*) Executable Path">
                </div>
                <div class="generator-categories-container">
                  <h2>Categories</h2>
                  <div class="generator-categories">
                    
                  </div>
                  <select id="fit-current-selection-select">
                    <option id="fit-current-selection-option">Add Category</option>
                  </select>
                </div>
                <div class="generator-terminal-slider-container">
                  <label class="switch">
                    <input type="checkbox" id="generator-terminal-checkbox" onchange="doGenerate()">
                    <span class="slider"></span>
                  </label>
                  <p>&nbsp;Open a terminal with this app</p>
                </div>
              </div>
              <div class="generator-code-btns-container">
                <div>
                  <h2>Generated Code</h2>
                  <textarea id="generator-code" cols="30" rows="10" disabled></textarea>
                </div>
                <div class="generator-btns">
                  <div class="btn" tabindex="0" onclick="generatorClear()">Clear</div>
                  <div class="btn" tabindex="0" onclick="generatorDownload()">Download</div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </div>
    <form id="translate_activator_form" action="index.php" method="post">
      <textarea id="string_to_translate" name="string" rows=10 cols=30 value="nothing"></textarea>
    </form>
    <script src="scripts/functions.js"></script>
    <script src="scripts/background.js"></script>
    <script src="scripts/magic-bar-twitch.js"></script>
    <script src="scripts/translate.js"></script>
    <script src="scripts/time.js"></script>
    <script src="scripts/fun.js"></script>
    <script src="scripts/generator.js"></script>
    <script src="scripts/panel.js"></script>
    <script><?php if (!empty($_POST)) { echo("panel('translate');"); } ?></script></div>
    <div class="bottom-bar">
      <p>DeepL is responsible for processing translation requests and handling the data input into the translator. None of your data is stored in cookies, nor on the skejs.eu server :)</p>
    </div>
  </body>
</html>
