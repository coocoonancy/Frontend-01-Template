/**
 * @param {number[]} start1
 * @param {number[]} end1
 * @param {number[]} start2
 * @param {number[]} end2
 * @return {number[]}
 */
var intersection = function(start1, end1, start2, end2) {
    var result = [];
    function ratio(a, b) {
        var h = b[1] - a[1];
        var w = b[0] - a[0]; 
        return {
            w: w,
            h: h,
            ratio: (h / w)
        };
    }
    function prarrel(a, b) {
        return (b[0] - a[0] !== 0);
    }
    function vertical(a, b) {
        return (b[1] - a[1] !== 0);
    }
    function expressFn() {
        if (end1[0] !== start1[0] && end2[0] !== start2[0]) {
        var key1 = (end1[1] - start1[1]) / (end1[0] - start1[0]);
        var key2 = (end2[1] - start2[1]) / (end2[0] - start2[0]);
        if (key1 !== key2) {
            result[0] = (key1 * start1[0] - start1[1] + start2[1] - key2 * start2[0]) / (key1 - key2);
            result[1] = key1 * (result[0] - start1[0]) + start1[1];
        } else {
            result[0] = Math.min(start1[0], end1[0], start2[0], end2[0]);
            result[1] = key1 * (result[0] - start1[0]) + start1[1];
        }
        }
        return result;
    }
    var ratio11 = ratio(end1, start1);
    var ratio21 = ratio(end2, start2);
    if (ratio11.w === 0 && ratio21.w !== 0) {
        result[0] = start1[0];
        result[1] = (end2[1] - start2[1]) / (end2[0] - start2[0]) * (result[0] - start2[0]) + start2[1];
    } else if (ratio11.w !== 0 && ratio21.w === 0) {
        result[0] = start2[0];
        result[1] = (end1[1] - start1[1]) / (end1[0] - start1[0]) * (result[0] - start1[0]) + start1[1];
    } else if (ratio11.w === 0 && ratio21.w === 0) {
        if (prarrel(start1, start2)) {
            result = [];
        } else {
            result[0] = start1[0];
            result[1] = Math.min(start1[1], end1[1], start2[1], end2[1]);
        }
    }  else if (ratio11.h === 0 && ratio21.h === 0) {
        if (vertical(start1, start2)) {
            result = [];
        } else {
            result[0] = Math.min(start1[0], end1[0], start2[0], end2[0]);
            result[1] = start1[1];
        }
    } else  {
        result = expressFn();
    }

    return result;
    
};