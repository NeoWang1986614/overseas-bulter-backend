export const convertHouseDealEntity = function(entity) {
    console.log('convert carousel figure entity')
    return {
        uid: entity.uid,
        dealType: entity.deal_type,
        source: entity.source,
        houseId: entity.house_id,
        decoration: entity.decoration,
        cost: entity.cost,
        linkman: entity.linkman,
        contactNum: entity.contact_num,
        mail: entity.mail,
        weixin: entity.weixin,
        image: entity.image,
        note: entity.note,
        creator: entity.creator,
        meta: entity.meta,
        createTime: entity.create_time,
    }
}

export const convertHouseDealObject = function(obj) {
    console.log('convert carousel figure object')
    return {
        uid: obj.uid,
        deal_type: obj.dealType,
        source: obj.source,
        house_id: entity.houseId,
        decoration: obj.decoration,
        cost: obj.cost,
        linkman: obj.linkman,
        contact_num: obj.contactNum,
        mail: obj.mail,
        weixin: obj.weixin,
        image: obj.image,
        note: obj.note,
        creator: obj.creator,
        meta: obj.meta,
        create_time: obj.createTime,
    }
}

export const convertHouseDealEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertHouseDealEntity(entities[i]))
    }
    console.log(result)
    return result;
}