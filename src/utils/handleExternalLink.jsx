export function handleExternalLink() {
    let editors = document.getElementsByClassName('editor')
    if (!editors.length) return
    Object.values(editors).forEach(editor => {
        let anchors = editor.getElementsByTagName('a')
        if (!anchors.length) return
        for (let i = 0; i < anchors.length; i++) {
            anchors[i].setAttribute('target', '_blank');
        }
    })
}