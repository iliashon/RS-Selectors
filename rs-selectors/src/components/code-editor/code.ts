class Code {
  public static renderHmtlMarkup(html: string[]): void {
    const codeBlock = document.querySelector('.markup') as Element;
    codeBlock.innerHTML = '';
    const divTable = document.createElement('div') as Element;
    divTable.prepend('<div class="table">');
    codeBlock.append(divTable);
    html.forEach((elem) => {
      const div = document.createElement('div');
      div.textContent = elem;
      divTable.append(div);
    });
    divTable.append('</div>');
  }
}

export default Code;
