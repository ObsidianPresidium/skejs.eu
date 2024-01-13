name="pycharm-professional-bin"
pkgver="2023.3.2"
pkgname="pycharm-professional"
maintainer="ObsidianPresidium <emil@aarestrup.nu>"
pkgdesc="Python IDE for professional developers aimed at productivity with a keyboard-centric focus."
url="https://download.jetbrains.com/python/pycharm-professional-${pkgver}.tar.gz"
hash="add6cb45aed969a49b21322fbd2e34c896f2a618d2a9eb8c865a05602365ef6c"
desktop_file_sum="ac3320c2fc890c3b60df964e6671a836e59c498909e3039be6be8596a7298ce2"
repology=("project: pycharm")

prepare() {
  wget -qO "pycharm-professional.desktop" "https://skejs.eu/pacstall/packages/pycharm-professional-bin/pycharm-professional.desktop"
  if [[ "$(sha256sum pycharm-professional.desktop | cut -d' ' -f 1)" != "${desktop_file_sum}" ]]; then
    fancy_message error "Checksum for pycharm-professional.desktop failed"
    return 1
  fi
}

package() {
  sudo mkdir -p "${pkgdir}/usr/share/licenses/pycharm"
  sudo mkdir -p "${pkgdir}/usr/share/pycharm"
  sudo mkdir -p "${pkgdir}/usr/share/pixmaps"
  sudo cp -dr --no-preserve='ownership' bin jbr lib plugins "${pkgdir}/usr/share/pycharm/"
  sudo cp -dr --no-preserve='ownership' license "${pkgdir}/usr/share/licenses/pycharm/"
  sudo cp -dr "${pkgdir}/usr/share/pycharm/bin/pycharm.png" "${pkgdir}/usr/share/pixmaps/"
  sudo install -Dm 644 pycharm-professional.desktop -t "${pkgdir}"/usr/share/applications/
}

post_install() {
  sudo ln -sf "/usr/share/pycharm/bin/pycharm.sh" "/usr/bin/pycharm-professional"
}

post_remove() {
  sudo rm -f /usr/bin/pycharm-professional
}