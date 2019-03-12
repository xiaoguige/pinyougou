//抽取公共部分的controller
app.controller('baseController_specification',function($scope){
	//分页控件配置
	$scope.paginationConf = {
		currentPage: 1,//当前页
		totalItems: 10,//总记录数
		itemsPerPage: 10,//每页显示记录数
		perPageOptions: [10, 20, 30, 40, 50],//每页显示记录数选项
		//当上面的数据发生改变就会触发下面这个函数执行
		onChange: function(){
			$scope.reloadList(); //重新查询
		}
	};
	
	//进行多条件分页查询
	$scope.reloadList = function(){
		$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
	}
	
	$scope.entity = {specification:{},specificationList:[]}; //定义存放规格,规格选项的对象
	
	//添加规格选项行
	$scope.addTableRow =function(){
		$scope.entity.specificationList.push({});
	}
	//删除规格选项行
	$scope.delTableRow=function(index,id){
		$scope.entity.specificationList.splice(index,1);//index:表示要删除元素对象的位置,1:要删除的个数	
		//当规格选项id存在时,执行删除操作
		if(id != null){
			$scope.delSpecOption(id);
		}
		
	}
	
	
	//定义存放规格id列表的数组
	$scope.selectIds = [];
	
	//定义一个方法,来更新用户选择的复选框
	$scope.updateSelection = function($event,id){
		//当复选框被选中
		if($event.target.checked){
			$scope.selectIds.push(id);
		}else{
			//说明取消选中的复选框
			var index = $scope.selectIds.indexOf(id); //取消选中当前元素的id在数组中的位置
			$scope.selectIds.splice(index,1); //index:表示当前元素对象的位置,1:表示要删除的个数
		}
	}
});