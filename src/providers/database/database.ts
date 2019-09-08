import { Injectable } from '@angular/core';
// Plugins
import { SQLiteObject } from '@ionic-native/sqlite';
// Others
import moment from 'moment';
import "moment/locale/es";

@Injectable()
export class DatabaseProvider {

    db: SQLiteObject = null;

    constructor() {
        console.log('DatabaseProvider:::Provider');
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

    // ------------------------------- Citas -----------------------------
    async getAllCitas(doctor: any) {
        let sql = 'SELECT * FROM doctor_appointments WHERE doctor_id=? ORDER BY day DESC, hour DESC';
        try {
            const response = await this.db.executeSql(sql, [doctor.id]);
            let citas = [];
            for (let index = 0; index < response.rows.length; index++) {
                citas.push(response.rows.item(index));
            }
            return Promise.resolve(citas);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    insertCita(cita: any) {
        let sql = 'INSERT INTO doctor_appointments(day, hour, question, doctor_id) VALUES(?,?,?,?)';
        return this.db.executeSql(sql, [cita.day, cita.hour, cita.question, cita.doctor_id]);
    }

    updateCita(cita: any) {
        let sql = 'UPDATE doctor_appointments SET day=?, hour=?, question=?, doctor_id=? WHERE id=?';
        return this.db.executeSql(sql, [cita.day, cita.hour, cita.question, cita.doctor_id, cita.id]);
    }

    deleteCita(id: any) {
        let sql = 'DELETE FROM doctor_appointments WHERE id=?';
        return this.db.executeSql(sql, [id]);
    }

    // ------------------------------- Medicos -----------------------------
    async getAllMedicos() {
        let sql = 'SELECT * FROM doctors ORDER BY id DESC';
        try {
            const response = await this.db.executeSql(sql, []);
            let doctors = [];
            for (let index = 0; index < response.rows.length; index++) {
                doctors.push(response.rows.item(index));
            }
            return Promise.resolve(doctors);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    insertMedico(medico: any) {
        let sql = 'INSERT INTO doctors(names, prefix, speciality, phone, email) VALUES(?,?,?,?,?)';
        return this.db.executeSql(sql, [medico.names, medico.prefix, medico.speciality, medico.phone, medico.email]);
    }

    updateMedico(medico: any) {
        let sql = 'UPDATE doctors SET names=?, prefix=?, speciality=?, phone=?, email=? WHERE id=?';
        return this.db.executeSql(sql, [medico.names, medico.prefix, medico.speciality, medico.phone, medico.email, medico.id]);
    }

    deleteMedico(id: any) {
        let sql = 'DELETE FROM doctors WHERE id=?';
        return this.db.executeSql(sql, [id]);
    }

    // ------------------------------- Medicamento -----------------------------
    async getAllMedicamento() {
        let sql = 'SELECT * FROM medicines ORDER BY name ASC';
        try {
            const response = await this.db.executeSql(sql, []);
            let medicines = [];
            for (let index = 0; index < response.rows.length; index++) {
                medicines.push(response.rows.item(index));
            }
            return Promise.resolve(medicines);
        } catch (error) {
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
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async showMedicamento(id: number) {
        let sql = 'SELECT * FROM medicines WHERE id=?';
        try {
            const response = await this.db.executeSql(sql, [id]);
            let medicine = response.rows.item(0);
            return Promise.resolve(medicine);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    // ------------------------------- Recordatorio -----------------------------
    async getAllRecordatorio() {
        let dateNow = moment().format('YYYY-MM-DD');
        let sql = 'SELECT rt.day_duration, rt.hour, rt.quantity, r.note, rt.id , rt.status, m.name FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id WHERE rt.status=1 AND rt.day_duration="' + dateNow + '" ORDER BY rt.day_duration DESC, rt.hour ASC';
        try {
            const response = await this.db.executeSql(sql, []);
            let recordatorios = [];
            for (let index = 0; index < response.rows.length; index++) {
                recordatorios.push(response.rows.item(index));
            }
            return Promise.resolve(recordatorios);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    insertRecordatorio(recordatorio: any) {
        let sql = 'INSERT INTO reminders(note, medicine_id) VALUES(?,?)';
        return this.db.executeSql(sql, [recordatorio.note, recordatorio.medicine_id]);
    }

    // ------------------------------- Recordatorio Times-----------------------------
    insertRecordatorioTimes(recordatorioTime: any, id: number) {
        let sql = 'INSERT INTO reminder_times(day_duration, hour, quantity, status, reminder_id) VALUES(?,?,?,?,?)';
        return this.db.executeSql(sql, [recordatorioTime.day_duration, recordatorioTime.hour, recordatorioTime.quantity, recordatorioTime.status, id]);
    }

    tomaRecordatorioTimes(recordatorioTime: any) {
        let sql = 'UPDATE reminder_times SET status=? WHERE id=?';
        return this.db.executeSql(sql, [recordatorioTime.status, recordatorioTime.id]);
    }

    //--------------------------------Progreso-----------------------------------------
    async getAllProgreso() {
        let reminderTimesGroupDay = 'SELECT rt.day_duration FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id GROUP BY rt.day_duration ORDER BY rt.day_duration ASC';
        try {
            const responseGroupDay = await this.db.executeSql(reminderTimesGroupDay, []);
            let reminderTimesGroupDay_ = [];
            for (let i = 0; i < responseGroupDay.rows.length; i++) {
                let rowsGroupDay_ = responseGroupDay.rows.item(i);
                let dayDuration_ = rowsGroupDay_.day_duration;
                let reminderTimesGroupName = 'SELECT m.name FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id WHERE rt.day_duration="' + dayDuration_ + '" GROUP BY m.name ORDER BY rt.day_duration ASC';
                const responseGroupName = await this.db.executeSql(reminderTimesGroupName, []);
                let reminderTimesGroupName_ = [];
                for (let j = 0; j < responseGroupName.rows.length; j++) {
                    let rowsGroupName_ = responseGroupName.rows.item(j);
                    let medicamentoName_ = rowsGroupName_.name;
                    let reminderTimesAll = 'SELECT rt.day_duration, rt.hour, rt.quantity, r.note, rt.id , rt.status, m.name FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id WHERE rt.day_duration="' + dayDuration_ + '" AND m.name="' + medicamentoName_ + '" ORDER BY rt.day_duration ASC, rt.hour ASC';
                    const responseGroupAll = await this.db.executeSql(reminderTimesAll, []);
                    let responseGroupAll_ = [];
                    for (let k = 0; k < responseGroupAll.rows.length; k++) {
                        let rowsGroupAll_ = responseGroupAll.rows.item(k);
                        responseGroupAll_.push(rowsGroupAll_);
                    }
                    rowsGroupName_['data'] = responseGroupAll_;
                    reminderTimesGroupName_.push(rowsGroupName_);
                }
                rowsGroupDay_['medicamento'] = reminderTimesGroupName_;
                reminderTimesGroupDay_.push(rowsGroupDay_);
            }
            return Promise.resolve(reminderTimesGroupDay_);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async getDataInforme() {
        let reminderTimesGroupDay = 'SELECT rt.day_duration FROM reminder_times rt INNER JOIN reminders r ON r.id=rt.reminder_id INNER JOIN medicines m ON m.id=r.medicine_id GROUP BY rt.day_duration ORDER BY rt.day_duration ASC';
        try {
            const responseGroupDay = await this.db.executeSql(reminderTimesGroupDay, []);
            let reminderTimesGroupDay_ = [];
            for (let i = 0; i < responseGroupDay.rows.length; i++) {
                reminderTimesGroupDay_.push(responseGroupDay.rows.item(i));
            }
            return Promise.resolve(reminderTimesGroupDay_);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

}
