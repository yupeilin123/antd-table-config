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

  insert(column, insertIndex) {
    this.data.splice(insertIndex, 0, column);
  }

  swap(sourceIndex, targetIndex) {
    [this.data[sourceIndex], this.data[targetIndex]] = [this.data[targetIndex], this.data[sourceIndex]];
  }

  edit(column) {
    this.data[this.data.findIndex((_) => _.dataIndex === column.dataIndex)] = column;
  }

  delete(column) {
    this.data.splice(this.data.findIndex((_) => _.dataIndex === column.dataIndex), 1);
  }
}

export default TableColumn;
