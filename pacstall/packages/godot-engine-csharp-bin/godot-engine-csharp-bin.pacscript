name="godot-engine-csharp-bin"
pkgver="4.2.1"
pkgname="godot-engine-csharp"
gives="godot-engine-csharp"
maintainer="ObsidianPresidium <emil@aarestrup.nu>"
pkgdesc="Free and open source 2D and 3D game engine"
url="https://github.com/godotengine/godot/releases/download/${pkgver}-stable/Godot_v${pkgver}-stable_mono_linux_x86_64.zip"
hash="9180ba6f67a516f49d234c1c4c39f52bf650edf417a2c90456f5ce458f9f1041"
desktop_file_sum="85cc7669a098c9b298f36addeaa2a13cc526bf75ff7d4f6e5e807cfd830fc502"
icon_sum="d50bef35fb12d039f55f54b653386f046587bcc359b75229b379e126d8ab4445"
repology=("project: godot")

prepare() {
  wget -qO "godot-engine-csharp.desktop" "https://skejs.eu/pacstall/packages/godot-engine-csharp-bin/godot-engine-csharp.desktop"
  wget -qO "godot.png" "https://skejs.eu/pacstall/packages/godot-engine-csharp-bin/godot.png"
  if [[ "$(sha256sum godot-engine-csharp.desktop | cut -d' ' -f 1)" != "${desktop_file_sum}" ]]; then
    fancy_message error "Checksum for godot-engine-csharp.desktop failed"
    return 1
  fi
  if [[ "$(sha256sum godot.png | cut -d' ' -f 1)" != "${icon_sum}" ]]; then
    fancy_message error "Checksum for godot.png failed"
    return 1
  fi
}

package() {
  sudo mkdir -p "${pkgdir}/usr/share/godot-engine-csharp"
  sudo mkdir -p "${pkgdir}/usr/share/pixmaps"
  sudo cp -dr --no-preserve="ownership" Godot_v${pkgver}-stable_mono_linux.x86_64 GodotSharp/ "${pkgdir}/usr/share/godot-engine-csharp/"
  if [[ ! -f "/usr/share/pixmaps/godot.png" ]]; then  # prevent an error when conflicting with godot-engine-bin
    sudo cp -dnr "godot.png" "${pkgdir}/usr/share/pixmaps/"
  fi
  sudo install -Dm 644 "godot-engine-csharp.desktop" -t "${pkgdir}/usr/share/applications"
}

post_install() {
  sudo ln -sf "/usr/share/godot-engine-csharp/Godot_v${pkgver}-stable_mono_linux.x86_64" "/usr/bin/godot4-csharp"
}

post_remove() {
  sudo rm -f /usr/bin/godot4-csharp
}