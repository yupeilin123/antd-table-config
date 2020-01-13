class TableColumn {
  static initialize() {
    return new TableColumn();
  }

  constructor() {
    this.data = []; // title , dataIndex ,  width
  }

  add(column) {
    this.data.push(column);
  }

  // eslint-disable-next-line class-methods-use-this
  insert() {

  }

  // eslint-disable-next-line class-methods-use-this
  edit() {

  }

  delete({ dataIndex } = {}) {
    this.data.splice(this.data.findIndex((_) => _.dataIndex === dataIndex), 1);
  }
}

export default TableColumn;
