class Code {
  public static renderHmtlMarkup(html: string): void {
    const codeBlock = document.querySelector('#code-html') as Element;
    codeBlock.textContent = html;
  }
}

export default Code;
