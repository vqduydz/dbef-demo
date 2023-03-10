import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { getAdditionalUserInfo } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';

import { db } from './firebaseConfig';

function addDocument(user, fullName) {
    const details = getAdditionalUserInfo(user);

    if (details.isNewUser) {
        const dbRef = collection(db, 'users');
        const { displayName, email, photoURL, uid, phoneNumber, emailVerified } = user.user;
        const dataDoc = {
            displayName: displayName || fullName,
            email,
            photoURL,
            uid,
            phoneNumber,
            emailVerified,
            gender: null,
            birthYear: null,
            avatarUrl: null,
            fullName: null,
        };

        addDoc(dbRef, dataDoc)
            .then((docRef) => {
                const ref = doc(db, 'users', docRef.id);
                const updateDataDoc = {
                    id: docRef.id,
                    createdAt: serverTimestamp(),
                };
                updateDoc(ref, updateDataDoc);
            })
            .catch((error) => {
                //console.log(error);
            });
    }
}

export default addDocument;
