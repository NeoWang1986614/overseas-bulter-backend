export const convertPriceParamsEntity = function(entity) {
    console.log('convert price params entity')
    return {
        uid: entity.uid,
        serviceId: entity.service_id,
        layoutId: entity.layout_id,
        algorithmType: entity.algorithm_type,
        params: entity.params,
        meta: entity.meta
    }
}

export const convertPriceParamsObject = function(obj) {
    console.log('convert price params object')
    return {
        uid: obj.uid,
        service_id: obj.serviceId,
        layout_id: obj.layoutId,
        algorithm_type: obj.algorithmType,
        params: obj.params,
        meta: obj.meta
    }
}

export const convertPriceParamsEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertPriceParamsEntity(entities[i]))
    }
    console.log(result)
    return result;
}