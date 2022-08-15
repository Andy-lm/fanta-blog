const filterHtml = (str:string) => {
    return str.replace(/<\/?.+?>|&nbsp;/g, "");
}

export default filterHtml