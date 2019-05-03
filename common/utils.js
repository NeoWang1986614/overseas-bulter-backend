import Vue from 'vue'
import { preUrl } from '../config/http.js'

export function getAllOrdersAsync(offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=all', {
            offset: offset,
            length: length
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByNameAsync(name, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=real_name', {
            offset: offset,
            length: length,
            'real_name': name
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByIdCardNumberAsync(idCardNumber, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=id_card_number', {
            offset: offset,
            length: length,
            'id_card_number': idCardNumber
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByPhoneNumberAsync(phoneNumber, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=phone_number', {
            offset: offset,
            length: length,
            'phone_number': phoneNumber
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersBeforeTimeAsync(time, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=before_time', {
            offset: offset,
            length: length,
            time: time
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersAfterTimeAsync(time, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=after_time', {
            offset: offset,
            length: length,
            time: time
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersRangeTimeAsync(fromTime, toTime, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=range_time', {
            offset: offset,
            length: length,
            'from_time': fromTime,
            'to_time': toTime
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByAddressAsync(country, province, city, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=address', {
            offset: offset,
            length: length,
            country: country,
            province: province,
            city: city
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByLayoutGroupAsync(layouts, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=layout_group', {
            offset: offset,
            length: length,
            'layout_group': layouts
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByStatusGroupAsync(statuses, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=status_group', {
            offset: offset,
            length: length,
            'status_group': statuses
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersBelowPriceAsync(price, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=below_price', {
            offset: offset,
            length: length,
            price: price
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersAbovePriceAsync(price, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=above_price', {
            offset: offset,
            length: length,
            price: price
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersByOrderTypeGroupAsync(orderTypes, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=order_type_group', {
            offset: offset,
            length: length,
            'type_group': orderTypes
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrdersRangePriceAsync(fromPrice, toPrice, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/order/search/advanced?type=range_price', {
            offset: offset,
            length: length,
            'from_price': fromPrice,
            'to_price': toPrice
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getOrderAsync(id, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/order?id=' + id, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function modifyOrderAsync(orderEntity, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/order',
        orderEntity, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function deleteOrderAsync(id, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/order?id=' + id, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getFeedbacksAsync(orderId, offset, length, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/feedback/search', {
            offset: offset,
            length: length,
            order_id: orderId,
            is_from_back_end: 1
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function addFeedbackAsync(feedbackEntity, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/feedback',
        feedbackEntity, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getServicesByServiceTypeAsync(type, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/service/search', {
            type: type
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function getServicesByTypeLayoutAsync(type, layout, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/service/search', {
            type: type,
            layout: layout
        }, { "emulateJson": false }
    ).then(res => {
        if (callback) {
            callback(res.body)
        }
    })
}

export function addServiceAsync(serviceEntity, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/service',
        serviceEntity, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function modifyServiceAsync(serviceEntity, callback) {
    console.log('modifyServiceAsync', serviceEntity);
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/service',
        serviceEntity, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function getUserAsync(userId, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/user?uid=' + userId, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function employeeCheckAsync(userName, password, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/employee/check', {
            user_name: userName,
            password: password
        }, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function queryRecordsAsync(recordType, orderId, offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/' + recordType + '/search', {
            order_id: orderId,
            offset: offset,
            count: count
        }, { "emulateJson": false }
    ).then(res => {
        // console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function deleteRecordAsync(recordType, uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/' + recordType + '?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function addRecordAsync(recordType, entity, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/' + recordType,
        entity, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

// export function addRentRecordAsync(entity, callback) {
//     Vue.http.post(
//         preUrl + '/overseas-bulter/v1/rent-record',
//         entity, { "emulateJson": false }
//     ).then(res => {
//         console.log(res.body);
//         if (callback) {
//             callback(res.body)
//         }
//     })
// }

// export function addInspectRecordAsync(entity, callback) {
//     Vue.http.post(
//         preUrl + '/overseas-bulter/v1/inspect-record',
//         entity, { "emulateJson": false }
//     ).then(res => {
//         console.log(res.body);
//         if (callback) {
//             callback(res.body)
//         }
//     })
// }

// export function addRepairRecordAsync(entity, callback) {
//     Vue.http.post(
//         preUrl + '/overseas-bulter/v1/repair-record',
//         entity, { "emulateJson": false }
//     ).then(res => {
//         console.log(res.body);
//         if (callback) {
//             callback(res.body)
//         }
//     })
// }

export function updateRecordAsync(recordType, uid, entity, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/' + recordType + '?uid=' + uid,
        entity, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function getRecordAsync(recordType, uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/' + recordType + '?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}