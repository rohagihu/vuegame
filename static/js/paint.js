export default function paint (obj, setClass) {
  let select = document.querySelector('[data-fieldx="' + obj.x + '"][data-fieldy="' + obj.y + '"]')
  select.innerHTML = '<span class="' + setClass + '">' + obj.icon + '</span>'
}
