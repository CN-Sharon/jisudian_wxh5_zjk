import {
    parseTime,
    getYMD,
    getHMS,
    getdTimeres,
} from '@/utils'

export  { 
    parseTime,
    getYMD,
    getHMS,
    getdTimeres
}
// export function getdTimes(startTime, endTime) {
//     let val
//     if (startTime > endTime) {
//         return '-'
//     }
//     val = (endTime - startTime) / 1000;
//     let d = Math.floor(val / 86400);
//     val = val % 86400
//     let h = Math.floor(val / 3600); 
//     val = val % 3600
//     let m = Math.floor(val / 60);
//     let s = Math.floor(val % 60);
//     h =  h < 10 ? '0' + h : '' + h
//     m = m < 10 ? '0' + m : '' + m
//     s = s < 10 ? '0' + s : '' + s
//     return {
//         d, h, m, s
//     }
// }


