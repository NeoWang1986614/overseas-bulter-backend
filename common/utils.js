import Vue from 'vue'
import { preUrl } from '../config/http.js'
import {
    convertServicePrimaryEntity,
    convertServicePrimaryObject,
    convertServicePrimaryEntities
} from '../src/entity/service-primary.js'
import {
    convertLayoutEntity,
    convertLayoutObject,
    convertLayoutEntities
} from '../src/entity/layout.js'
import {
    convertPriceParamsEntity,
    convertPriceParamsObject,
    convertPriceParamsEntities
} from '../src/entity/price-params.js'
import {
    convertCarouselFigureEntity,
    convertCarouselFigureObject,
    convertCarouselFigureEntities
} from '../src/entity/carousel-figure.js'
import {
    convertHouseDealEntity,
    convertHouseDealObject,
    convertHouseDealEntities
} from '../src/entity/house-deal.js'
import {
    convertHouseEntity,
    convertHouseObject,
    convertHouseEntities
} from '../src/entity/house.js'

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

export function getDateCnText(dateStr) {
    var d = new Date(dateStr.replace(/-/g, '/'));
    var ret = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
    console.log(ret);
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
}

export function convertDateToCnText(object, pro) {
    object[pro + 'Cn'] = getDateCnText(object[pro]);
}

/*service primary*/
export function addServicePrimaryAsync(obj, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/service-primary',
        convertServicePrimaryObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        // var convertedObj = convertServicePrimaryEntity(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function queryServicePrimaryAsync(uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/service-primary?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObj = convertServicePrimaryEntity(res.body);
        if (callback) {
            callback(convertedObj)
        }
    })
}

export function updateServicePrimaryAsync(obj, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/service-primary',
        convertServicePrimaryObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function deleteServicePrimaryAsync(uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/service-primary?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function querySearchServicePrimaryAsync(offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/service-primary/search', {
            count: count,
            offset: offset
        }, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObjects = convertServicePrimaryEntities(res.body);
        if (callback) {
            callback(convertedObjects)
        }
    })
}

/*layout*/
export function addLayoutAsync(obj, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/layout',
        convertLayoutObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function queryLayoutAsync(uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/layout?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObj = convertLayoutEntity(res.body);
        if (callback) {
            callback(convertedObj)
        }
    })
}

export function updateLayoutAsync(obj, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/layout',
        convertLayoutObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function deleteLayoutAsync(uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/layout?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function querySearchLayoutAsync(offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/layout/search', {
            count: count,
            offset: offset
        }, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObjects = convertLayoutEntities(res.body);
        if (callback) {
            callback(convertedObjects)
        }
    })
}

/*price params*/
export function addPriceParamsAsync(obj, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/price-params',
        convertPriceParamsObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function queryPriceParamsAsync(uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/price-params?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObj = convertPriceParamsEntity(res.body);
        if (callback) {
            callback(convertedObj)
        }
    })
}

export function updatePriceParamsAsync(obj, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/price-params',
        convertPriceParamsObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function deletePriceParamsAsync(uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/price-params?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function querySearchPriceParamsAsync(offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/price-params/search?queryType=range', {
            count: count,
            offset: offset
        }, { "emulateJson": false }
    ).then(res => {
        var convertedObjects = convertPriceParamsEntities(res.body);
        if (callback) {
            callback(convertedObjects)
        }
    })
}

/*carousel figure*/
export function addCarouselFigureAsync(obj, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/carousel-figure',
        convertCarouselFigureObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function queryCarouselFigureAsync(uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/carousel-figure?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObj = convertCarouselFigureEntity(res.body);
        if (callback) {
            callback(convertedObj)
        }
    })
}

export function updateCarouselFigureAsync(obj, callback) {
    Vue.http.put(
        preUrl + '/overseas-bulter/v1/carousel-figure',
        convertCarouselFigureObject(obj), { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function deleteCarouselFigureAsync(uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/carousel-figure?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

export function querySearchCarouselFigureAsync(offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/carousel-figure/search?queryType=range', {
            count: count,
            offset: offset
        }, { "emulateJson": false }
    ).then(res => {
        var convertedObjects = convertCarouselFigureEntities(res.body);
        if (callback) {
            callback(convertedObjects)
        }
    })
}

/*house deal*/
export function queryHouseDealAsync(uid, callback) {
    Vue.http.get(
        preUrl + '/overseas-bulter/v1/house-deal?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        var convertedObj = convertHouseDealEntity(res.body);
        if (callback) {
            callback(convertedObj)
        }
    })
}

export function queryHouseDealsAsync(dealType, offset, count, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/house-deal/search?queryType=deal_type', {
            deal_type: dealType,
            offset: offset,
            count: count
        }, { "emulateJson": false }
    ).then(res => {
        console.log('utils.queryHouseDealAsync = ', res.body);
        var convertedObjs = convertHouseDealEntities(res.body.entities);
        if (callback) {
            callback(res.body.total, convertedObjs)
        }
    })
}

export function deleteHouseDealAsync(uid, callback) {
    Vue.http.delete(
        preUrl + '/overseas-bulter/v1/house-deal?uid=' + uid, { "emulateJson": false }
    ).then(res => {
        console.log(res.body);
        if (callback) {
            callback(res.body)
        }
    })
}

/*house*/
export function queryHousesByUidsAsync(uids, callback) {
    Vue.http.post(
        preUrl + '/overseas-bulter/v1/house/search?queryType=uids', {
            uids: uids,
        }, { "emulateJson": false }
    ).then(res => {
        console.log('utils.queryHouseDealAsync = ', res.body);
        var convertedObjs = convertHouseEntities(res.body);
        if (callback) {
            callback(convertedObjs)
        }
    })
}



/*tool*/
export function generateHouseAddress(house) {
    return 'Room ' + house.roomNum + ', ' +
        'Building ' + house.buildingNum + ', ' +
        house.streetNum + ' ' + house.streetName + ' Street, ' +
        house.adLevel3 + ', ' +
        house.adLevel2 + ', ' +
        house.adLevel1 + ', ' +
        house.nation
}