export const convertImageEntity = function(entity) {
    return {
        title: entity.title,
        desc: entity.desc,
        urls: entity.urls,
    }
}

export const convertImageEntities = function(entities) {
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertImageEntity(entities[i]))
    }
    return result;
}