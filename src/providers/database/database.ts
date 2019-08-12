import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

    db: SQLiteObject = null;

    constructor() {
        console.log('Hello DatabaseProvider Provider');
    }

    setDatabase(db: SQLiteObject) {
        console.log("DatabaseProvider:::setDatabase:::");
        if (this.db === null) {
            console.log("DatabaseProvider:::setDatabase:::NULL");
            this.db = db;
        }
    }

    createTableMedicines() {
        console.log("DatabaseProvider:::createTableMedicines");
        let sql = 'CREATE TABLE IF NOT EXISTS medicines(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
        return this.db.executeSql(sql, []);
    }

    createTableReminders() {
        console.log("DatabaseProvider:::createTableReminders");
        let sql = 'CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT, medicine_id INTEGER, FOREIGN KEY(medicine_id) REFERENCES medicines(id))';
        return this.db.executeSql(sql, []);
    }

    createTableReminderTimes() {
        console.log("DatabaseProvider:::createTableReminderTimes");
        let sql = 'CREATE TABLE IF NOT EXISTS reminder_times(id INTEGER PRIMARY KEY AUTOINCREMENT, day_duration TEXT, hour TEXT, quantity INTEGER, status INTEGER, reminder_id INTEGER, FOREIGN KEY(reminder_id) REFERENCES reminders(id))';
        return this.db.executeSql(sql, []);
    }

    createTableDoctors() {
        console.log("DatabaseProvider:::createTableDoctors");
        let sql = 'CREATE TABLE IF NOT EXISTS doctors(id INTEGER PRIMARY KEY AUTOINCREMENT, names TEXT, prefix TEXT, speciality TEXT, phone TEXT, email TEXT)';
        return this.db.executeSql(sql, []);
    }

    createTableDoctorAppointments() {
        console.log("DatabaseProvider:::createTableDoctorAppointments");
        let sql = 'CREATE TABLE IF NOT EXISTS doctor_appointments(id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, hour TEXT, question TEXT, doctor_id INTEGER, FOREIGN KEY(doctor_id) REFERENCES doctors(id))';
        return this.db.executeSql(sql, []);
    }

    async getAllMedicamento() {
        let sql = 'SELECT * FROM medicines';
        try {
            const response = await this.db.executeSql(sql, []);
            let medicines = [];
            for (let index = 0; index < response.rows.length; index++) {
                medicines.push(response.rows.item(index));
            }
            return Promise.resolve(medicines);
        }
        catch (error) {
            return await Promise.reject(error);
        }
    }

    insertMedicamento(medicine: any) {
        let sql = 'INSERT INTO medicines(name) VALUES(?)';
        return this.db.executeSql(sql, [medicine.name]);
    }

    updateMedicamento(medicine: any) {
        let sql = 'UPDATE medicines SET name=? WHERE id=?';
        return this.db.executeSql(sql, [medicine.name, medicine.id]);
    }

    deleteMedicamento(medicine: any) {
        let sql = 'DELETE FROM medicines WHERE id=?';
        return this.db.executeSql(sql, [medicine.id]);
    }

    async searchMedicamento(palabra: any) {
        let sql = "SELECT * FROM medicines WHERE name LIKE '%" + palabra + "%' ORDER BY name ASC";
        try {
            const response = await this.db.executeSql(sql, []);
            let medicines = [];
            for (let index = 0; index < response.rows.length; index++) {
                medicines.push(response.rows.item(index));
            }
            return Promise.resolve(medicines);
        }
        catch (error) {
            return await Promise.reject(error);
        }
    }

    showMedicamento(medicine: any) {
        let sql = 'SELECT * FROM medicines WHERE id=?';
        return this.db.executeSql(sql, [medicine.id]);
    }

    async getAllRecordatorio() {
        let sql = 'SELECT rt.day_duration, rt.hour, rt.quantity, r.note, m.name FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id WHERE rt.status=1';
        try {
            const response = await this.db.executeSql(sql, []);
            let recordatorios = [];
            for (let index = 0; index < response.rows.length; index++) {
                recordatorios.push(response.rows.item(index));
            }
            return Promise.resolve(recordatorios);
        }
        catch (error) {
            return await Promise.reject(error);
        }
    }

}
