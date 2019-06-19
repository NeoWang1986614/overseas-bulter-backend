export const convertLayoutEntity = function(entity) {
    console.log('convert layout entity')
    return {
        uid: entity.uid,
        value: entity.value,
        title: entity.title,
        location: entity.location,
        content: entity.content,
        meta: entity.meta
    }
}

export const convertLayoutObject = function(obj) {
    console.log('convert layout object')
    return {
        uid: obj.uid,
        value: obj.value,
        title: obj.title,
        location: obj.location,
        content: obj.content,
        meta: obj.meta
    }
}

export const convertLayoutEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertLayoutEntity(entities[i]))
    }
    console.log(result)
    return result;
}