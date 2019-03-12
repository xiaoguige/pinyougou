//抽取公共部分的controller
app.controller('baseController',function($scope){
	//分页控件配置
	$scope.paginationConf = {
		currentPage: 1,//当前页 
		totalItems: 10,//总记录数
		itemsPerPage: 10,//每页显示记录数
		perPageOptions: [10, 20, 30, 40, 50],//每页显示记录数选项
		//当上面的数据发生改变就会触发下面这个函数执行
		onChange: function(){
			$scope.reloadList();//重新加载
		}
	};
	
	
	$scope.reloadList = function(){
		 $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
	}
	
	//定义一个用户存放品牌id的数组
	$scope.selectIds = [];
	
	//定义一个更新用户选择id复选框的方法
	$scope.updateSelection=function($event,id){
		//取消全选复选框的选中状态
		$('#selall').attr('checked',false);
		//用于判断复选框是否被选中
		if($event.target.checked){
			$scope.selectIds.push(id);//将选中的id存放到$scope.selectIds数组中
		}else{
			//当复选框被取消选中时执行的操作
			var index = $scope.selectIds.indexOf(id);//获取id在数组中的索引位置
			$scope.selectIds.splice(index,1); //index表示id在数组中的位置，1：表示删除的个数
		}		
	}
	
	//定义搜索条件查询对象
	$scope.searchEntity = {};
	
	//定义用于保存查询条件参数的实体对象
	$scope.conditionEntity = {};
	
	
	//复选框全部选中
	$scope.seletAll = function($event){
		if($event.target.checked){
			//清空selectIds数组
			$scope.selectIds = [];
			//当复选框被选中
			//首先选中第一个复选框
			$('#selall').prop('checked',true);
			//然后选中所有class属性为seleOne的复选框
			$('.seleOne').each(function(){
				 $(this).prop('checked',true);
				 //获取id属性的值
				 var id = $(this).prop('id');
				 //将id属性的值转成数字类型
				 var numId = parseInt(id);
				 //将id值添加到selectIds数组中
				 $scope.selectIds.push(numId);
			});
		}else{
			//取消选中
			$('#sellAll').prop('checked',false);
			//然后选中所有class属性为seleOne的复选框
			$('.seleOne').each(function(){
				//取消每个复选框的选中状态
				 $(this).prop('checked',false);
			/*	 //将id值从复选框中移除
				 var id = $(this).prop('id');
				 var numId = parseInt(id);
				 var index = $scope.selectIds.indexOf(numId);
				 $scope.selectIds.splice(index,1);//index:该id在数组中位置,1:表示移除的个数
*/			});
			//清空selectIds数组
			$scope.selectIds = [];
		}
	}
});