export const convertCaseEntity = function(entity) {
    console.log('convert')
    return {
        uid: entity.uid,
        title: entity.title,
        imageUrl: entity.image_url,
        content: entity.content,
        price: entity.price,
        level: entity.level
    }
}

export const convertCaseObject = function(obj) {
    console.log('convert')
    return {
        uid: obj.uid,
        title: obj.title,
        image_url: obj.imageUrl,
        content: obj.content,
        price: obj.price,
        level: obj.level
    }
}

export const convertCaseEntities = function(entities) {
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertCaseEntity(entities[i]))
    }
    return result;
}