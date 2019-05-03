export const convertOrderEntity = function(entity) {
    console.log('convert')
    return {
        id: entity.id,
        type: entity.type,
        content: entity.content,
        houseNation: entity.house_nation,
        houseAdLevel1: entity.house_ad_level_1,
        houseAdLevel2: entity.house_ad_level_2,
        houseAdLevel3: entity.house_ad_level_3,
        houseStreetName: entity.house_street_name,
        houseStreetNum: entity.house_street_num,
        houseBuildingNum: entity.house_building_num,
        houseRoomNum: entity.house_room_num,
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
        house_nation: obj.houseNation,
        house_ad_level_1: obj.houseAdLevel1,
        house_ad_level_2: obj.houseAdLevel2,
        house_ad_level_3: obj.houseAdLevel3,
        house_street_name: obj.houseStreetName,
        house_street_num: obj.houseStreetNum,
        house_building_num: obj.houseBuildingNum,
        house_room_num: obj.houseRoomNum,
        house_layout: obj.houseLayout,
        price: obj.price,
        status: obj.status,
        placer_id: obj.placerId,
        accepter_id: obj.accepterId,
        create_time: obj.createTime
    }
}

export const convertOrderEntities = function(entities) {
    console.log('convert');
    if (undefined == entities || null == entities) {
        return;
    }
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertOrderEntity(entities[i]))
    }
    console.log(result)
    return result;
}