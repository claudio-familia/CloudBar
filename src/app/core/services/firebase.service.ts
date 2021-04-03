import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private _fireStoreService: AngularFireStorage) { }    

    async saveFileToStorage(fileName: string, fileUpload: File): Promise<any> {       

        const filePath = `${environment.firebase.storageFolder}/${fileName}`;
        const storageRef = this._fireStoreService.ref(filePath);
        const uploadTask = this._fireStoreService.upload(filePath, fileUpload);        

        await uploadTask.snapshotChanges().toPromise();
        const fileResult = await storageRef.getDownloadURL().toPromise().then(url => url);

        return fileResult;
    }
}