<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>embers Pacstall Repo</title>
  <style>
      body {
          width: 50em;
      }
      pre {
        padding: .5em;
        background-color: lightgrey;
      }
  </style>
</head>
<body>
  <h1>ObsidianPresidium's Pacstall Repo</h1>
  <p>Welcome to my Pacstall repo, which I use for pacscripts that aren't quite up to the quality standards of the original Pacstall repo, or are otherwise in the pipeline getting ready for official release.</p>
  <h2>List of pacscripts in this repository:</h2>
  <ul>
    <?php
      $handle = fopen("packagelist", "r");
      if ($handle) {
        while (($line = fgets($handle)) !== false) {
          echo("<li><a href=\"/pacstall/packages/$line/$line.pacscript\">$line</a></li>");
        }
        fclose($handle);
      }
    ?>
  </ul>
  <h2>How to add this repository to Pacstall.</h2>
  <p>Adding this repository to your Pacstall installation is simple. Just copy/paste this command into a terminal.</p>
  <pre>pacstall -A "https://skejs.eu/pacstall"</pre>
  <p>Beware: this action is <b>permanent!</b><br>This is because there is no command yet to disable/remove a repository. Add this repository at your own risk (I can't guarantee any of my pacscripts won't conflict with pacscripts of the main repo.)</p>
  <h2>What is Pacstall? How do I install it?</h2>
  <p>Pacstall is an additional package manager for Debian-based systems, which builds on top of APT and is inspired by the AUR. To install it, follow the instructions on <a href="https://pacstall.dev">pacstall.dev</a>.</p>
</body>
</html>