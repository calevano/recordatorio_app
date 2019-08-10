import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

    db: SQLiteObject = null;

    constructor() {
        console.log('Hello DatabaseProvider Provider');
    }

    setDatabase(db: SQLiteObject) {
        if (this.db === null) {
            this.db = db;
        }
    }

    createTableMedicines() {
        let sql = 'CREATE TABLE IF NOT EXISTS medicines(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
        return this.db.executeSql(sql, []);
    }
    createTableReminders() {
        let sql = 'CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT, medicine_id INTEGER, FOREIGN KEY(medicine_id) REFERENCES medicines(id))';
        return this.db.executeSql(sql, []);
    }
    createTableReminderTimes() {
        let sql = 'CREATE TABLE IF NOT EXISTS reminder_times(id INTEGER PRIMARY KEY AUTOINCREMENT, day_duration TEXT, hour TEXT, quantity INTEGER, status INTEGER, reminder_id INTEGER, FOREIGN KEY(reminder_id) REFERENCES reminders(id))';
        return this.db.executeSql(sql, []);
    }
    createTableDoctors() {
        let sql = 'CREATE TABLE IF NOT EXISTS doctors(id INTEGER PRIMARY KEY AUTOINCREMENT, names TEXT, prefix TEXT, speciality TEXT, phone TEXT, email TEXT)';
        return this.db.executeSql(sql, []);
    }
    createTableDoctorAppointments() {
        let sql = 'CREATE TABLE IF NOT EXISTS doctor_appointments(id INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT, hour TEXT, questions TEXT, doctor_id INTEGER, FOREIGN KEY(doctor_id) REFERENCES doctors(id))';
        return this.db.executeSql(sql, []);
    }

    insertMedicamento(medicine: any) {
        let sql = 'INSERT INTO medicines(name) VALUES(?)';
        return this.db.executeSql(sql, [medicine.name]);
    }

    updateMedicamento() {

    }

    deleteMedicamento() {

    }

    getAllMedicamento() {

    }

    showMedicamento() {

    }



}
