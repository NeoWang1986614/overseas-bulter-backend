import { convertImageEntities } from './image.js'

export const convertRepairRecordEntity = function(entity) {
    console.log('convert Repair record entity')
    return {
        uid: entity.uid,
        orderId: entity.order_id,
        reportTime: entity.report_time,
        repairTime: entity.repair_time,
        completeTime: entity.complete_time,
        comment: entity.comment,
        cost: entity.cost,
        status: entity.status,
        relatedImage: convertImageEntities(JSON.parse(entity.related_image)),
        updateTime: entity.update_time,
        createTime: entity.create_time,
    }
}

export const convertRepairRecordObject = function(obj) {
    console.log('convert Repair Record object')
    return {
        order_id: obj.orderId,
        report_time: obj.reportTime,
        repair_time: obj.repairTime,
        complete_time: obj.completeTime,
        comment: obj.comment,
        cost: obj.cost,
        status: obj.status,
        related_image: obj.relatedImage
    }
}

export const convertRepairRecordEntities = function(entities) {
    console.log('convert RepairRecord entities')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertRepairRecordEntity(entities[i]))
    }
    console.log(result)
    return result;
}