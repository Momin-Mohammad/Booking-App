let inTimeHr = new Date("2023-08-04" + " " + "10:30").getHours();
let inTimeMin = new Date("2023-08-04 " + "10:30").getMinutes();
let outTimeHr = new Date("2023-08-04 " + "17:00").getHours();
let outTimeMin = new Date("2023-08-04 " + "17:00").getMinutes();

let totalCost = 0;
// if(inTimeHr < 16 && outTimeHr <= 16){
//     let hrDiff = outTimeHr - inTimeHr;
//     let minDiff = outTimeMin - inTimeMin;
//     totalCost = (hrDiff + (minDiff/60)) * 100
// }else if(inTimeHr >= 16){
//     let hrDiff = outTimeHr - inTimeHr;
//     let minDiff = outTimeMin - inTimeMin;
//     totalCost = (hrDiff + (minDiff/60)) * 500
// }else{ 
//     let firstHalfHr = 16 - inTimeHr;
//     firstHalfCost = (firstHalfHr - (inTimeMin/60)) * 100;
//     let secondHalfHr = outTimeHr - 16;
//     secondHalfCost = (secondHalfHr + (inTimeMin/60)) * 500;
//     totalCost = firstHalfCost + secondHalfCost
// }

    let hrDiff = outTimeHr - inTimeHr;
    let minDiff = outTimeMin - inTimeMin;
    totalCost = (hrDiff + (minDiff/60)) * 50

console.log(totalCost)