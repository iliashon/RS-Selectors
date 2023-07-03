function renderHmtlMarkup(html: string): void {
  const codeBlock = document.querySelector('.markup') as Element;
  codeBlock.innerHTML = html;
  codeBlock.append('</div>');
  codeBlock.prepend('<div class="table">');
  // const parse = new DOMParser();
  // const xml = parse.parseFromString(html, 'text/xml');
  // console.log(xml.getElementsByTagName('div'));
  // appendNode(xml.getElementsByTagName('div')[0].childNodes);
  // codeBlock.innerHTML = '';
  // const divTable = document.createElement('div') as Element;
  // divTable.classList.add('table-markup');
  // divTable.prepend('<div class="table">');
  // codeBlock.append(divTable);
  // html.forEach((elem, index) => {
  //   const div = document.createElement('div');
  //   div.textContent = elem;
  //   div.setAttribute('data-id', index.toString());
  //   divTable.append(div);
  // });
  // divTable.append('</div>');
}

export default renderHmtlMarkup;
