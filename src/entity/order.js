export const convertOrderEntity = function(entity) {
    console.log('convert')
    return {
        id: entity.id,
        type: entity.type,
        content: entity.content,
        houseCountry: entity.house_country,
        houseProvince: entity.house_province,
        houseCity: entity.house_city,
        houseAddress: entity.house_address,
        houseLayout: entity.house_layout,
        price: entity.price,
        status: entity.status,
        placerId: entity.placer_id,
        accepterId: entity.accepter_id,
        createTime: entity.create_time
    }
}
export const convertOrderObject = function(obj) {
    console.log('convert')
    return {
        id: obj.id,
        type: obj.type,
        content: obj.content,
        house_country: obj.houseCountry,
        house_province: obj.houseProvince,
        house_city: obj.houseCity,
        house_address: obj.houseAddress,
        house_layout: obj.houseLayout,
        price: obj.price,
        status: obj.status,
        placer_id: obj.placerId,
        accepter_id: obj.accepterId,
        create_time: obj.createTime
    }
}

export const convertOrderEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertOrderEntity(entities[i]))
    }
    console.log(result)
    return result;
}