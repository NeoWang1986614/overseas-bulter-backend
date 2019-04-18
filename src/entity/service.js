export const convertServiceEntity = function(entity) {
    console.log('convert service entity')
    return {
        uid: entity.id,
        type: entity.type,
        layout: entity.layout,
        content: entity.content,
        price: entity.price,
        createTime: entity.create_time
    }
}

export const convertServiceObject = function(obj) {
    console.log('convert service object')
    return {
        id: obj.uid,
        type: obj.type,
        layout: obj.layout,
        content: obj.content,
        price: obj.price
    }
}

export const convertServiceEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertServiceEntity(entities[i]))
    }
    console.log(result)
    return result;
}