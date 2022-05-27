const fs = require('fs');

class FileSystem {
  constructor(name) {
    if (!name) console.error({error: 'Falta nombre de archivo'});
    this.id = 0;
    this.file = `./src/db/${name}.txt`;
    // this.file = `./db/${name}.txt`;
    this._writeFile('');
  }

  async _readFile() {
    const content = await fs.promises.readFile(this.file, 'utf-8');
    return JSON.parse(content) || [];
  }

  async _writeFile(records) {
    await fs.promises.writeFile(this.file, JSON.stringify(records, null, 2))
  }

  async findAll() {
    try {
      return await this._readFile();
    }
    catch (err) {
      console.error(err);
    }
  };

  async find(id) {
    try {
      const records = await this._readFile();
      const record = records.find(r => r.id == id);
      if (!record) return { error: 'Registro no encontrado' };
      return record;
    }
    catch (err) {
      console.error(err);
    }
  }

  async create(data) {
    try {
      const records = await this._readFile();
      const newRecord = { ...data, id: ++this.id, timestamp: Date.now() };
      records.push(newRecord);
      await this._writeFile(records);
      return newRecord;
    }
    catch (err) {
      console.error(err);
    }
  };

  async update(data, id) {
    try {
      const records = await this._readFile();
      const newRecord = { id: Number(id), ...data, timestamp: Date.now() };
      const index = records.findIndex(r => r.id == id);
      if (index == -1) return { error: 'Registro no encontrado' };
      records[index] = newRecord;
      await this._writeFile(records);
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id) {
    try {
      const records = await this._readFile();
      const index = records.findIndex(r => r.id == id);
      if (index == -1) return { error: 'Registro no encontrado' };
      records.splice(index, 1);
      await this._writeFile(records);
    }
    catch (err) {
      console.error(err);
    }
  };

  async removeAll() {
    try {
      await this._writeFile([]);
    }
    catch (err) {
      console.error(err);
    }
  };
}

module.exports = FileSystem;
