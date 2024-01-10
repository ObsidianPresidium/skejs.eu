name="godot-engine-bin"
pkgver="4.2.1"
pkgname="godot-engine"
gives="godot-engine"
maintainer="ObsidianPresidium <emil@aarestrup.nu>"
pkgdesc="Free and open source 2D and 3D game engine"
url="https://github.com/godotengine/godot/releases/download/${pkgver}-stable/Godot_v${pkgver}-stable_linux.x86_64.zip"
hash="86311a9e75b7445eb4215312e604df1f69c72d4641af3e67049e30356ae37660"
desktop_file_sum="eed9082d825c6e9a8514a509effebf38c506f74987633fa11ee0d1f3da25d6ee"
icon_sum="4be1ea0a01c33227888cff7a3fd5dd6df988237bf81470cfded807173627bdab"
repology=("project: godot")

prepare() {
  wget -qO "godot-engine.desktop" "https://skejs.eu/pacstall/packages/godot-engine-bin/godot-engine.desktop"
  wget -qO "godot.png" "https://skejs.eu/pacstall/packages/godot-engine-bin/godot.png"
  if [[ "$(sha256sum godot-engine.desktop | cut -d' ' -f 1)" != "${desktop_file_sum}" ]]; then
    fancy_message error "Checksum for godot-engine.desktop failed"
    return 1
  fi
  if [[ "$(sha256sum godot.png | cut -d' ' -f 1)" != "${icon_sum}" ]]; then
    fancy_message error "Checksum for godot.png failed"
    return 1
  fi
}

package() {
  sudo mkdir -p "${pkgdir}/usr/share/godot-engine"
  sudo mkdir -p "${pkgdir}/usr/share/pixmaps"
  sudo cp -dr --no-preserve="ownership" Godot_v${pkgver}-stable_linux.x86_64 "${pkgdir}/usr/share/godot-engine/"
  sudo cp -dr "godot.png" "${pkgdir}/usr/share/pixmaps/"
  sudo install -Dm 644 "godot-engine.desktop" -t "${pkgdir}/usr/share/applications"
}

post_install() {
  sudo ln -sf "/usr/share/godot-engine/Godot_v${pkgver}-stable_linux.x86_64" "/usr/bin/godot4"
}

post_remove() {
  sudo rm -f /usr/bin/godot4
}