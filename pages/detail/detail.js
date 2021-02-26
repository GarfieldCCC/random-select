// pages/detail/detail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		index: 0,
		input: '',
		values: '',
		title: '',
		all: [],
		content: [],
		completed: true,  // 弹窗控制
		temp: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	save: function () {
		wx.setStorageSync('all_list', this.data.all)
	},

	load: function (options) {
		var all = wx.getStorageSync('all_list')
		var temp_content = []
		for (var temp in all) {
			if (all[temp].title === options.title) {
				temp_content.push(all[temp])
			}
		}
		this.setData({
			title: options.title,
			index: options.index,
			all: all,
			content: temp_content
		})
	},

	onLoad: function (options) {
		this.load(options)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	inputChangeHandle: function (e) {
		this.setData({ input: e.detail.value })
	},

	addTodoHandle: function (e) {
		if (!this.data.input || !this.data.input.trim()) return
		var all = !this.data.all ? [] : this.data.all
		var content = this.data.content
		all.push({ title: this.data.title, content: this.data.input })
		content.push({ title: this.data.title, content: this.data.input })
		this.setData({
			input: '',
			all: all,
			content: content
		})
		this.save()
	},

	removeHandle: function (e) {
		var index = e.currentTarget.dataset.index
		var content = this.data.content
		var all = this.data.all
		for (var t in all) {
			if (all[t].content == content[index].content) {
				all.splice(t, 1)
			}
		}
		content.splice(index, 1)
		this.setData({
			content: content,
		})
		this.save()
	},

	randomSelect: function () {
		var content = this.data.content
		var res = Math.floor(Math.random() * content.length)
		var result = content[res].content
		console.log(result)
		wx.showModal({
			title: ' 筛选结果 ',
			content: ' ' + result + ' ',
			confirmText: '满意',
			cancelText: '不满意',
			success(res) {
				if (res.confirm) {
					console.log('对结果非常满意~')
				} else if (res.cancel) {
					console.log('再来一次吧')
				}
			}
		})
	},

	getUserInput: function (e) {
		this.setData({ values: e.detail.value })
	},

	cancelSelected: function () {
		this.setData({ completed: true })
	},

	successSelected: function (e) {
		var index = this.data.index
		var temp = this.data.temp
		var content = this.data.content
		var all = this.data.all
		console.log(all)
		content[index].content = this.data.values
		for (var t in all) {
			if (all[t].content == temp) {
				all[t].content = this.data.values
				break
			}
		}
		this.setData({ all:all, content: content, completed: true })
		this.save()
	},

	tip: function (e) {
		var index = e.currentTarget.dataset.index
		var title = this.data.content[index].content
		this.setData({ completed: false, values: title, index: index, temp: title })
	}
})