export const convertServicePrimaryEntity = function(entity) {
    console.log('convert service primary entity')
    return {
        uid: entity.uid,
        value: entity.value,
        title: entity.title,
        iconUrl: entity.icon_url,
        location: entity.location,
        content: entity.content,
        basePrice: entity.base_price,
        meta: entity.meta,
        createTime: entity.create_time
    }
}

export const convertServicePrimaryObject = function(obj) {
    console.log('convert service primary object')
    return {
        uid: obj.uid,
        value: obj.value,
        title: obj.title,
        icon_url: obj.iconUrl,
        location: obj.location,
        content: obj.content,
        base_price: obj.basePrice,
        meta: obj.meta
    }
}

export const convertServicePrimaryEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertServicePrimaryEntity(entities[i]))
    }
    console.log(result)
    return result;
}