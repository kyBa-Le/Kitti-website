// storage.js lưu local: chỉ truyền vào giá trị đã stringify
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// lấy giá trị từ local: truyền vào key, trả về một array
export async function getFromLocalStorage(key) {
    return await JSON.parse(await (localStorage.getItem(key)));
}

export function readFileJson(path){
    return fetch(path).then(respone => respone.json().then(data => data));
    console.log("File read successfully!");
}
// export function saveToJsonFile(path, data){
//     const jsonData = JSON.stringify(data);
//     const fs = require("fs");
//     fs.writeFile(path,jsonData, (err) =>{
//         if (err) {
//             console.error(err);
//         } else {
//             console.log('Data written successfully to file.');
//         }
//     })
// }