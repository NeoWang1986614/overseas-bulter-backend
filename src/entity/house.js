export const convertHouseEntity = function(entity) {
    console.log('convert house entity')
    return {
        uid: entity.uid,
        name: entity.name,
        property: entity.property,
        lat: entity.lat,
        lng: entity.lng,
        adLevel1: entity.ad_level_1,
        adLevel2: entity.ad_level_2,
        adLevel3: entity.ad_level_3,
        locality: entity.locality,
        nation: entity.nation,
        streetName: entity.street_name,
        streetNum: entity.street_num,
        buildingNum: entity.building_num,
        roomNum: entity.room_num,
        layout: entity.layout,
        area: entity.area,
        ownerId: entity.owner_id,
        status: entity.status,
        meta: entity.meta
    }
}

export const convertHouseObject = function(obj) {
    console.log('convert carousel figure object')
    return {
        uid: obj.uid,
        name: obj.name,
        property: obj.property,
        lat: obj.lat,
        lng: obj.lng,
        ad_level_1: obj.adLevel1,
        ad_level_2: obj.adLevel2,
        ad_level_3: obj.adLevel3,
        locality: obj.locality,
        nation: obj.nation,
        street_name: obj.streetName,
        street_num: obj.streetNum,
        building_num: obj.buildingNum,
        room_num: obj.roomNum,
        layout: obj.layout,
        area: obj.area,
        owner_id: obj.ownerId,
        status: obj.status,
        meta: obj.meta
    }
}

export const convertHouseEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertHouseEntity(entities[i]))
    }
    console.log(result)
    return result;
}