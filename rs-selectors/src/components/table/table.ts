class Table {
  public static renderElementsOnTable(html: string): void {
    const tableWrapper = document.querySelector('.table-wrapper') as Element;
    tableWrapper.innerHTML = html;
  }
}

export default Table;
