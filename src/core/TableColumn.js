class TableColumn {
  static initialize() {
    return new TableColumn();
  }

  constructor() {
    this.data = []; // title ,dataIndex ,width
  }

  insert(column, insertIndex) {
    this.data.splice(insertIndex, 0, column);
  }

  replace(column, targetIndex) {
    this.data[targetIndex] = column;
  }

  swap(sourceIndex, targetIndex) {
    [this.data[sourceIndex], this.data[targetIndex]] = [this.data[targetIndex], this.data[sourceIndex]];
  }

  edit(column) {
    this.data[this.data.findIndex((_) => _.dataIndex === column.dataIndex)] = column;
  }

  delete(targetIndex) {
    this.data.splice(targetIndex, 1);
  }
}

export default TableColumn;
