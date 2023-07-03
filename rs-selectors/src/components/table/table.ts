function renderElementsOnTable(html: string): void {
  const tableWrapper = document.querySelector('.table') as Element;
  tableWrapper.innerHTML = html;
}

export default renderElementsOnTable;
