<template>
  <div class="wrap">
    <div class="search-container">
      <div class="search-mode-container">
        <el-cascader class="search-mode"
          expand-trigger="hover"
          :options="dealTypeOptions"
          v-model="dealTypeCurrentOptions"
          @change="onDealTypeChange">
        </el-cascader>
      </div>
    </div>
    <div class="order-list-container">
      <template>
        <el-table
          :data="houseDeals"
          :border="true"
          :header-cell-style="tableHeaderCellStyle"
          :cell-style="tableCellStyle"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="uid"
            :show-overflow-tooltip="true"
            label="编号"
            :resizable="true"
            width="160">
          </el-table-column>
          <el-table-column
            prop="houseId"
            :show-overflow-tooltip="true"
            label="房产名字"
            :formatter="houseNameFormatter"
            :resizable="true"
            width="80">
          </el-table-column>
          <el-table-column
            prop="source"
            :show-overflow-tooltip="true"
            label="是否代理"
            :formatter="sourceFormatter"
            :resizable="true"
            width="80">
          </el-table-column>
          <el-table-column
            prop="houseId"
            :resizable="true"
            label="房屋性质"
            :formatter="propertyFormatter"
            width="80">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="houseId"
            label="面积(m²)"
            :formatter="areaFormatter"
            width="70">
          </el-table-column>
          <el-table-column
            :resizable="true"
            :show-overflow-tooltip="true"
            prop="houseId"
            :formatter="addressFormatter"
            label="地址"
            width="120">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="decoration"
            label="装修情况"
            width="80">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="cost"
            :show-overflow-tooltip="true"
            label="费用(比索)"
            width="80">
          </el-table-column>
          <el-table-column 
          label="操作"
          :resizable="false"
          width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="onEnterDetailClick(scope.$index, scope.row)">查看详情</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="onDeleteClick(scope.$index, scope.row)" :disabled="'completed' == scope.row.status">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination-container">
      <div class="block">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="totalCount"
          :page-size="countPerPage"
          @current-change="onPaginationChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {number_max_value, constAddressCountry, constAddressProvince, constAddressCity} from '../../common/const.js'
import {deleteOrderAsync, getUserAsync} from '../../common/utils.js'
import {textMap} from '../../common/map.js'
import {
  queryHouseDealsAsync,
  deleteHouseDealAsync,
  queryHousesByUidsAsync,
  generateHouseAddress,
  } from '../../common/utils.js'
  import {convertOrderEntities} from '../entity/order.js'

export default {
  name: 'HouseDealManager',
  created: function(){
    this.countryOptions = constAddressCountry;
    this.provinceOptions = constAddressProvince;
    this.cityOptions = constAddressCity;
    this.dealTypeCurrentOptions = ['house-rent'];
    this.updateHouseDealList();
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      textMap: textMap,
      orders: [],
      number_max_value: number_max_value,
      dealTypeOptions:[
        {
          value: 'house-rent',
          label: '房屋出租'
        },
        {
          value: 'house-sale',
          label: '二手房买卖',
        }
      ],
      dealTypeCurrentOption: '',
      dealTypeCurrentOptions: [],
      /*用户信息*/
      userInfoCurrentIndex: 0,
      userInfoName: '',
      userInfoIdCardNumber: '',
      userInfoPhoneNumber: '',
      /*下单时间*/
      createTimeBeforeTime: '',
      createTimeAfterTime: '',
      createTimeRangeTimeFrom: '',
      createTimeRangeTimeTo: '',
      /*订单状态*/
      orderStatusOptions:[
        {
          value: 'non-payment',
          title: '未支付'
        },{
          value: 'paid',
          title: '已支付'
        },{
          value: 'accepted',
          title: '已接受'
        },{
          value: 'completed',
          title: '已完成'
        }
      ],
      checkOrderStatuses:[],
      /*地址*/
      countryOptions:[],
      currentCountryIndex: 0,
      provinceOptions:[],
      currentProvinceIndex: 0,
      cityOptions:[],
      currentCityIndex: 0,
      /*户型*/
      layoutOptions:[
        {
          value: 'studio',
          title: '单间'
        },{
          value: 'one-bedroom',
          title: '一室一厅'
        },{
          value: 'two-bedroom',
          title: '二室一厅'
        }
      ],
      checkLayouts:[],
      /*价格*/
      orderPriceBelow: '',
      orderPriceAbove: '',
      orderPriceRangeFrom: '',
      orderPriceRangeTo: '',
      /*订单类型*/
      orderTypeOptions:[
        {
          value: 'house-rent',
          title: '房屋出租'
        },{
          value: 'home-decoration',
          title: '家装布置'
        },{
          value: 'house-maintain',
          title: '维护保养'
        }
      ],
      checkOrderTypes:[],


      /*house deals*/
      houseDeals: [],
      houseInfoMap: {},
      /*pagination*/
      totalCount: 0,
      currentPage: 1,
      countPerPage: 8
    }
  },
  methods:{
    /*表样式，表内容*/
    tableCellStyle: function({ row, column, rowIndex, columnIndex }){
      var styleString = 'font-size: 10px; text-align: center;';
      return styleString;
    },
    tableHeaderCellStyle: function({ row, column, rowIndex, columnIndex }){
      if(0 == rowIndex){
        return 'background-color: lightblue;color: #fff;font-weight: 500; text-align: center; font-size: 10px;';
      }

    },
    houseNameFormatter: function(row, column, cellValue, index){
      if(this.houseInfoMap.hasOwnProperty(cellValue)){
        return this.houseInfoMap[cellValue].name;
      }
    },
    sourceFormatter: function(row, column, cellValue, index){
      return textMap[cellValue];
    },
    propertyFormatter: function(row, column, cellValue, index){
      if(this.houseInfoMap.hasOwnProperty(cellValue)){
        return textMap[this.houseInfoMap[cellValue].property];
      }
    },
    areaFormatter: function(row, column, cellValue, index){
      if(this.houseInfoMap.hasOwnProperty(cellValue)){
        return this.houseInfoMap[cellValue].area;
      }
    },
    addressFormatter: function(row, column, cellValue, index){
      if(this.houseInfoMap.hasOwnProperty(cellValue)){
        return generateHouseAddress(this.houseInfoMap[cellValue]);
      }
    },
    /**/
    onDealTypeChange: function(options){
      console.log(options);
      this.dealTypeCurrentOption = options;
      this.orders = [];
      this.currentPage = 1;
      this.updateHouseDealList();
    },
    onPaginationChange: function(page) {
      console.log(page);
      this.currentPage = page;
      this.updateHouseDealList();
    },
    updateUserInfo: function(){
      if(0!=this.orders.length){
        for(let i = 0; i < this.orders.length; i++){
          getUserAsync(this.orders[i].placerId, res => {
            console.log('get user', res);
            this.orders[i].userName = res.name;
          });
        }
      }
    },
    getHouseIdsFromHouseDeals: function(arr){
      if(0==arr.length){
        return [];
      }
      var ret = [];
      for(var i=0;i<arr.length;i++){
        ret.push(arr[i].houseId);
      }
      console.log('house uids = ', ret);
      return ret;
    },
    makeHouseInfoMap: function(arr){
      if(0==arr.length){
        return {};
      }
      var ret = {};
      for(var i=0;i<arr.length;i++){
        ret[arr[i].uid]=arr[i];
      }
      this.houseInfoMap = ret;
    },
    updateHouseDealList: function(){
      queryHouseDealsAsync(this.dealTypeCurrentOptions[0], (this.currentPage - 1) * this.countPerPage, this.countPerPage, (total, entities)=>{
          console.log('updateHouseDealList = ', entities);
          this.totalCount = total;
          this.houseDeals = entities;
          var houseIds = this.getHouseIdsFromHouseDeals(entities);
          if(0!=houseIds.length){
            queryHousesByUidsAsync(houseIds, res=>{
              console.log('get houses = ', res);
              this.makeHouseInfoMap(res);
              console.log('house info map = ', this.houseInfoMap);
            });
          }
      });
    },
    onEnterDetailClick(rowIndex, item) {
      console.log(rowIndex, item);
      this.$router.push({name: 'HouseDealEditor', params: {uid: item.uid}});
      
    },
    onDeleteClick(rowIndex, item) {
      console.log(rowIndex, item);
      this.$alert('确定删除?', '删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(action);
                        if(action == 'confirm'){
                            console.log('确定删除');
                            deleteHouseDealAsync(item.uid, res => {
                                this.$message({
                                  message: '删除成功!',
                                  type: 'warning'
                                });
                                this.updateHouseDealList();
                            });
                        }
                    }
                }); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
}

.search-container {
  width: 100%;
  min-height: 80px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.order-list-container {
  width: 100%;
  max-height: 500px;
  flex-grow: 1;
  // background: orange;
}

.pagination-container {
  width: 100%;
  height: 100px;
  // background: purple;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.search-mode-container {
  min-width: 100px;
  // background: lightblue;
  padding: 0 20px;
}

.search-mode {
  width: 240px;
}

.input-container {
  width: 300px;
}

.range-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

span {
  padding: 0 4px;
  color: gray;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.layout-dropdown {
  height: 20px;
  width: 580px;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
  // background: lightblue;
}

.el-dropdown {
  margin-left: 30px;
}

</style>
