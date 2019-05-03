<template>
  <div class="wrap">
    <div class="search-container">
      <div class="search-mode-container">
        <el-cascader class="search-mode"
          expand-trigger="hover"
          :options="searchModeOptions"
          v-model="seachModeCurrentOptions"
          @change="onSearchModeChange">
        </el-cascader>
      </div>
      <el-input v-if="seachModeCurrentOptions[0] == 'user-info' && seachModeCurrentOptions[1] == 'name'"
          class="input-container" 
          v-model="userInfoName" 
          type="text"
          @keyup.enter.native="onInputEnter"
          placeholder="请输入名字">
      </el-input>
      <el-input v-if="seachModeCurrentOptions[0] == 'user-info' && seachModeCurrentOptions[1] == 'id-card-number'"
          class="input-container" 
          v-model="userInfoIdCardNumber" 
          type="text"
          @keyup.enter.native="onInputEnter"
          placeholder="请输入身份证号码">
      </el-input>
      <el-input v-if="seachModeCurrentOptions[0] == 'user-info' && seachModeCurrentOptions[1] == 'phone-number'"
          class="input-container" 
          v-model="userInfoPhoneNumber" 
          type="text"
          @keyup.enter.native="onInputEnter"
          placeholder="请输入电话号码">
      </el-input>
      <div v-if="seachModeCurrentOptions[0] == 'create-time' && seachModeCurrentOptions[1] == 'before-time'">
        <div class="block">
          <el-date-picker
            v-model="createTimeBeforeTime"
            type="datetime"
            @change="onCreateTimeChange"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div v-if="seachModeCurrentOptions[0] == 'create-time' && seachModeCurrentOptions[1] == 'after-time'">
        <div class="block">
          <el-date-picker
            v-model="createTimeAfterTime"
            type="datetime"
            @change="onCreateTimeChange"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="range-container" v-if="seachModeCurrentOptions[0] == 'create-time' && seachModeCurrentOptions[1] == 'range-time'">
        <span>从</span>
        <div class="block">
          <el-date-picker
            v-model="createTimeRangeTimeFrom"
            type="datetime"
            @change="onCreateTimeChange"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <span>到</span>
        <div class="block">
          <el-date-picker
            v-model="createTimeRangeTimeTo"
            type="datetime"
            @change="onCreateTimeChange"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div v-if="seachModeCurrentOptions[0] == 'order-status'">
        <el-checkbox-group v-model="checkOrderStatuses" @change="onCheckedOrderStatusChange">
          <el-checkbox v-for="item in orderStatusOptions" :label="item.value" :key="item.value">{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="seachModeCurrentOptions[0] == 'address'">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{currentCountryIndex == number_max_value ? '未选择' : countryOptions[currentCountryIndex].title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in countryOptions" :key="item.value" @click.native="onCountryDropdownItemSelect(index)">
                    {{item.title}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
            <span class="el-dropdown-link">
                {{currentProvinceIndex == number_max_value ? '未选择' : provinceOptions[currentProvinceIndex].title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in provinceOptions" :key="item.value" @click.native="onProvinceDropdownItemSelect(index)">
                    {{item.title}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
            <span class="el-dropdown-link">
                {{currentCityIndex == number_max_value ? '未选择' : cityOptions[currentCityIndex].title}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in cityOptions" :key="item.value" @click.native="onCityDropdownItemSelect(index)">
                    {{item.title}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if="seachModeCurrentOptions[0] == 'layout'">
        <el-checkbox-group v-model="checkLayouts" @change="onCheckedLayoutChange">
          <el-checkbox v-for="item in layoutOptions" :label="item.value" :key="item.value">{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-input v-if="seachModeCurrentOptions[0] == 'price' && seachModeCurrentOptions[1] == 'below-price'"
          class="input-container" 
          v-model="orderPriceBelow" 
          type="text"
          @keyup.enter.native="onInputEnter"
          placeholder="请输入价格">
      </el-input>
      <el-input v-if="seachModeCurrentOptions[0] == 'price' && seachModeCurrentOptions[1] == 'above-price'"
          class="input-container" 
          v-model="orderPriceAbove" 
          type="text"
          @keyup.enter.native="onInputEnter"
          placeholder="请输入价格">
      </el-input>
      <div class="range-container" v-if="seachModeCurrentOptions[0] == 'price' && seachModeCurrentOptions[1] == 'range-price'">
        <span>从</span>
        <el-input
            class="input-container" 
            v-model="orderPriceRangeFrom" 
            type="text"
            @keyup.enter.native="onInputEnter"
            placeholder="请输入价格">
        </el-input>
        <span>到</span>
        <el-input
            class="input-container" 
            v-model="orderPriceRangeTo" 
            type="text"
            @keyup.enter.native="onInputEnter"
            placeholder="请输入价格">
        </el-input>
      </div>
      <div v-if="seachModeCurrentOptions[0] == 'order-type'">
        <el-checkbox-group v-model="checkOrderTypes" @change="onCheckedOrderTypeChange">
          <el-checkbox v-for="item in orderTypeOptions" :label="item.value" :key="item.value">{{item.title}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="order-list-container">
      <template>
        <el-table
          :data="orders"
          :border="true"
          :header-cell-style="tableHeaderCellStyle"
          :cell-style="tableCellStyle"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="id"
            :show-overflow-tooltip="true"
            label="订单编号"
            :resizable="true"
            width="80">
          </el-table-column>
          <el-table-column
            prop="type"
            :resizable="true"
            label="订单类型"
            :formatter="orderTypeFormatter"
            width="80">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="houseLayout"
            label="户型"
            :formatter="layoutFormatter"
            width="70">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="status"
            label="状态"
            :formatter="statusFormatter"
            width="60">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="price"
            label="价格(CNY)"
            width="80">
          </el-table-column>
          <el-table-column
            :resizable="true"
            :show-overflow-tooltip="true"
            :formatter="nameFormatter"
            label="用户名"
            width="80">
          </el-table-column>
          <el-table-column
            :resizable="true"
            :show-overflow-tooltip="true"
            :formatter="addressFormatter"
            label="房产地址"
            width="120">
          </el-table-column>
          <el-table-column
            :resizable="true"
            :show-overflow-tooltip="true"
            prop="createTime"
            label="下单时间"
            width="140">
          </el-table-column>
          <el-table-column
            :resizable="true"
            prop="content"
            :show-overflow-tooltip="true"
            label="订单内容">
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
  getAllOrdersAsync,
  getOrdersByStatusGroupAsync,
  getOrdersByNameAsync,
  getOrdersByIdCardNumberAsync,
  getOrdersByPhoneNumberAsync,
  getOrdersBeforeTimeAsync,
  getOrdersAfterTimeAsync,
  getOrdersRangeTimeAsync,
  getOrdersByAddressAsync,
  getOrdersByLayoutGroupAsync,
  getOrdersBelowPriceAsync,
  getOrdersAbovePriceAsync,
  getOrdersRangePriceAsync,
  getOrdersByOrderTypeGroupAsync
  } from '../../common/utils.js'
  import {convertOrderEntities} from '../entity/order.js'

export default {
  name: 'OrderManager',
  created: function(){
    this.countryOptions = constAddressCountry;
    this.provinceOptions = constAddressProvince;
    this.cityOptions = constAddressCity;
    this.updateOrderList();
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      textMap: textMap,
      orders: [],
      totalCount: 0,
      number_max_value: number_max_value,
      searchModeOptions:[
        {
          value: 'all',
          label: '所有'
        },
        {
          value: 'user-info',
          label: '按用户信息搜索',
          children:[
            {
              value: 'name',
              label: '名字',
            },
            {
              value: 'id-card-number',
              label: '身份证号码',
            },
            {
              value: 'phone-number',
              label: '电话号码',
            }
          ]
        },
        {
          value: 'create-time',
          label: '按下单时间搜索',
          children:[
            {
              value: 'before-time',
              label: '早于',
            },
            {
              value: 'after-time',
              label: '晚于',
            },
            {
              value: 'range-time',
              label: '时间范围',
            }
          ]
        },
        {
          value: 'order-status',
          label: '按订单状态搜索'
        },
        {
          value: 'address',
          label: '按地址搜索'
        },
        {
          value: 'layout',
          label: '按户型搜索'
        },
        {
          value: 'price',
          label: '按价格搜索',
          children:[
            {
              value: 'below-price',
              label: '低于',
            },
            {
              value: 'above-price',
              label: '高于',
            },
            {
              value: 'range-price',
              label: '价格范围',
            }
          ]
        },
        {
          value: 'order-type',
          label: '按订单类型搜索'
        },
      ],
      seachModeCurrentOptions: [],
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
      /*pagination*/
      currentPage: 1,
      countPerPage: 10
    }
  },
  methods:{
    /*表样式，表内容*/
    tableCellStyle: function({ row, column, rowIndex, columnIndex }){
      var styleString = 'font-size: 10px;';
      if(0 == columnIndex || 1 == columnIndex || 2 == columnIndex || 3 == columnIndex || 5 == columnIndex || 6 == columnIndex){
        styleString += 'text-align: center;';
      }
      else if (7 == columnIndex) {
        styleString += '';
      }
      else if (4 == columnIndex) {
        styleString += 'text-align: center;';
        if('non-payment' == this.orders[rowIndex].status){
          styleString += 'color: lightblue;';
        }else if('paid' == this.orders[rowIndex].status){
          styleString += 'color: red;';
        }else if('accepted' == this.orders[rowIndex].status){
          styleString += 'color: blue;';
        }else if('completed' == this.orders[rowIndex].status){
          styleString += 'color: lightgray;';
        }
      }
      return styleString;
    },
    tableHeaderCellStyle: function({ row, column, rowIndex, columnIndex }){
      if(0 == rowIndex){
        return 'background-color: lightblue;color: #fff;font-weight: 500; text-align: center; font-size: 10px;';
      }

    },
    orderTypeFormatter: function(row, column, cellValue, index){
      return textMap[cellValue];
    },
    layoutFormatter: function(row, column, cellValue, index){
      return textMap[cellValue];
    },
    statusFormatter: function(row, column, cellValue, index){
      return textMap[cellValue];
    },
    nameFormatter: function(row, column, cellValue, index){
      return this.orders[index].userName;
    },
    addressFormatter: function(row, column, cellValue, index){
      return 'Room ' + this.orders[index].houseRoomNum + ', ' +
        'Building ' + this.orders[index].houseBuildingNum + ', ' + 
        this.orders[index].houseStreetNum + ' ' + this.orders[index].houseStreetName + ' Street, ' + 
        this.orders[index].houseAdLevel3 + ', ' + 
        this.orders[index].houseAdLevel2 + ', ' +
        this.orders[index].houseAdLevel1 + ', ' +
        this.orders[index].houseNation;

      // return textMap[this.orders[index].houseNation] +
      // textMap[this.orders[index].houseAdLevel1] + 
      // textMap[this.orders[index].houseAdLevel2] +
      // this.orders[index].houseAdLevel3 +
      // this.orders[index].houseStreetName +
      // this.orders[index].houseStreetNum + '号' +
      // this.orders[index].houseBuildingNum + '栋' +
      // this.orders[index].houseRoomNum + '室';
    },
    /**/
    onSearchModeChange: function(item){
      console.log(item);
      console.log(this.seachModeCurrentOptions);
      this.orders = [];
      this.currentPage = 1;
      this.updateOrderList();
    },
    onCheckedOrderStatusChange: function(e){
      console.log(this.checkOrderStatuses);
      this.currentPage = 1;
      this.updateOrderList();
    },
    onCountryDropdownItemSelect: function(index) {
      console.log(index);
      this.currentCountryIndex = index;
      this.currentPage = 1;
      this.updateOrderList();
    },
    onProvinceDropdownItemSelect: function(index) {
      console.log(index);
      this.currentPage = 1;
      this.currentProvinceIndex = index;
      this.updateOrderList();
    },
    onCityDropdownItemSelect: function(index) {
      console.log(index);
      this.currentPage = 1;
      this.currentCityIndex = index;
      this.updateOrderList();
    },
    onCheckedLayoutChange: function(e){
      console.log(this.checkLayouts);
      this.currentPage = 1;
      this.updateOrderList();
    },
    onPaginationChange: function(page) {
      console.log(page);
      this.currentPage = page;
      this.updateOrderList();
    },
    onInputEnter: function(){
      console.log('start name search');
      this.currentPage = 1;
      this.updateOrderList();
    },
    onCreateTimeChange: function(e){
      console.log(e);
      this.currentPage = 1;
      this.updateOrderList();
    },
    onCheckedOrderTypeChange: function() {
      console.log(this.checkOrderTypes);
      this.currentPage = 1;
      this.updateOrderList();
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
    updateOrderList: function(){
      console.log(this.seachModeCurrentOptions);
      if(0 == this.seachModeCurrentOptions.length || this.seachModeCurrentOptions[0]=='all'){
        console.log('getAllOrdersAsync');
        getAllOrdersAsync((this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                  this.orders = convertOrderEntities(res.entities);
                  this.totalCount = res.total;
                  this.updateUserInfo();
                  console.log('orders: ', this.orders);
                })
      }
      else if(2==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='user-info'){
        if(this.seachModeCurrentOptions[1]=='name') {
          console.log('getOrdersByNameAsync');
          getOrdersByNameAsync(this.userInfoName, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='id-card-number') {
          console.log('getOrdersByIdCardNumberAsync');
          getOrdersByIdCardNumberAsync(this.userInfoIdCardNumber, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='phone-number') {
          console.log('getOrdersByPhoneNumberAsync');
          getOrdersByPhoneNumberAsync(this.userInfoPhoneNumber, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }
        
      }
      else if(2==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='create-time'){
        if(this.seachModeCurrentOptions[1]=='before-time') {
          console.log('getOrdersBeforeTimeAsync');
          getOrdersBeforeTimeAsync(this.createTimeBeforeTime, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='after-time') {
          console.log('getOrdersAfterTimeAsync');
          getOrdersAfterTimeAsync(this.createTimeAfterTime, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='range-time') {
          console.log('getOrdersRangeTimeAsync');
          getOrdersRangeTimeAsync(this.createTimeRangeTimeFrom, this.createTimeRangeTimeTo, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }
        
      }
      else if(1==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='address'){
        console.log('getOrdersByAddressAsync');
        getOrdersByAddressAsync(
          this.countryOptions[this.currentCountryIndex].value,
          this.provinceOptions[this.currentProvinceIndex].value, 
          this.cityOptions[this.currentCityIndex].value, 
          (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
      }
      else if(1==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='layout'){
        console.log('getOrdersByLayoutGroupAsync');
        getOrdersByLayoutGroupAsync(
          this.checkLayouts,
          (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
      }
      else if(1==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='order-status'){
        console.log('getOrdersByStatusGroupAsync');
        getOrdersByStatusGroupAsync(this.checkOrderStatuses, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
      }
      else if(2==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='price'){
        if(this.seachModeCurrentOptions[1]=='below-price') {
          console.log('getOrdersBelowPriceAsync');
          getOrdersBelowPriceAsync(parseInt(this.orderPriceBelow), (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='above-price') {
          console.log('getOrdersAbovePriceAsync');
          getOrdersAbovePriceAsync(parseInt(this.orderPriceAbove), (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }else if(this.seachModeCurrentOptions[1]=='range-price') {
          console.log('getOrdersRangePriceAsync');
          getOrdersRangePriceAsync(parseInt(this.orderPriceRangeFrom),parseInt(this.orderPriceRangeTo), (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
        }
        
      }
      else if(1==this.seachModeCurrentOptions.length && this.seachModeCurrentOptions[0]=='order-type'){
        console.log('getOrdersByOrderTypeGroupAsync');
        getOrdersByOrderTypeGroupAsync(this.checkOrderTypes, (this.currentPage - 1) * this.countPerPage, this.countPerPage , res => {
                this.orders = convertOrderEntities(res.entities);
                this.totalCount = res.total;
                this.updateUserInfo();
                console.log('orders: ', this.orders);
              });
      }
    },
    onEnterDetailClick(rowIndex, item) {
      console.log(rowIndex, item);
      this.$router.push({name: 'OrderEditor', params: {id: item.id}});
      
    },
    onDeleteClick(rowIndex, item) {
      console.log(rowIndex, item);
      this.$alert('确定删除订单?', '删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(action);
                        if(action == 'confirm'){
                            console.log('确定删除');
                            deleteOrderAsync(item.id, res => {
                                this.$message({
                                  message: '删除成功!',
                                  type: 'warning'
                                });
                                this.updateOrderList();
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
  height: 100px;
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
