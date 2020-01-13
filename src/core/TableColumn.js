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

  edit(column) {
    this.data[this.data.findIndex((_) => _.dataIndex === column.dataIndex)] = column;
  }

  delete(column) {
    this.data.splice(this.data.findIndex((_) => _.dataIndex === column.dataIndex), 1);
  }
}

export default TableColumn;
