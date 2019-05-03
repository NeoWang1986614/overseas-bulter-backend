import { convertImageEntities } from './image.js'

export const convertInspectRecordEntity = function(entity) {
    console.log('convert Inspect record entity')
    return {
        uid: entity.uid,
        orderId: entity.order_id,
        inspectDate: entity.inspect_date,
        inspector: entity.inspector,
        comment: entity.comment,
        config: convertConfigEntities(JSON.parse(entity.config)),
        area: convertImageEntities(JSON.parse(entity.area)),
        updateTime: entity.update_time,
        createTime: entity.create_time,
    }
}

export const convertInspectRecordObject = function(obj) {
    console.log('convert Inspect Record object')
    return {
        order_id: obj.orderId,
        inspect_date: obj.inspectDate,
        inspector: obj.inspector,
        comment: obj.comment,
        config: obj.config,
        area: obj.area
    }
}

/* config */
export const convertConfigEntity = function(entity) {
    return {
        title: entity.title,
        is_installed: entity.is_installed,
    }
}

export const convertConfigEntities = function(entities) {
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertConfigEntity(entities[i]))
    }
    return result;
}

export const convertInspectRecordEntities = function(entities) {
    console.log('convert InspectRecord entities')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertInspectRecordEntity(entities[i]))
    }
    console.log(result)
    return result;
}