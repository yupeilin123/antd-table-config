class TableColumn {
  static initialize(columns) {
    return new TableColumn(columns);
  }

  constructor(columns) {
    this.data = columns || []; // title ,dataIndex ,width
  }

  set(columns) {
    this.data = [...columns];
  }

  get() {
    return this.data;
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

  clear() {
    this.data = [];
  }
}

export default TableColumn;
