import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
} from "firebase/storage";

let storage: FirebaseStorage;

function initStorage() {
  if (!storage) {
    storage = getStorage();
  }
}

export function uploadFile(file: File, path: string): Promise<string> {
  initStorage();
  const storageRef = ref(storage, path);
  return uploadBytes(storageRef, file).then((result) => {
    return getDownloadURL(result.ref);
  });
}
