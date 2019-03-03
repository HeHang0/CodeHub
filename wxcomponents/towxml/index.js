//index.js

Component({
  properties: {
    content: {
      type: String,
      value: ""
    },
    loading: {
      type: Boolean,
      value: false
    }
  },
// 	ready: function(){
// 				const Towxml = require('../../wxcomponents/towxmla/main');
// 				let towxml = new Towxml()
// 		this.data.towxml = towxml
// 	},
  observers: {
    'content': function (article) {
			if(article == this.data.articleStr){
				return
			}else{
				this.data.articleStr = article
			}
				if(this.data.towxml == null){
					const Towxml = require('../../wxcomponents/towxmla/main');
					this.data.towxml = new Towxml()
				}
				article = this.data.towxml.md2html("```java\n"+article+"\n```")
				console.info(article)
        let articleData = this.data.towxml.toJson(article,'markdown');
				
// 				articleData = this.data.towxml.initData(articleData,{
// 				  base:'http://www.oohoo.xyz/',
// 				  app:this
// 				});
				articleData.theme = 'light';
				this.setData({
					'article': articleData,
					'loading': false
				})
				console.log("我在微信：")
				
    },
    'loading': function (isloading) {
				this.setData({
					'isloading': isloading
				})
    },
  },
  data: {
		// 这里是一些组件内部数据
		article:{},
		articleStr: "",
		isloading: false,
		towxml: null
  },
})
/*
Page({
  data: {
    isloading: true,
    article: {},
    timer:undefined
  },
  onLoad: function () {
    const _ts = this;

    //请求Markdown文件内容
    app.getText(app.docDir + 'demo.txt?v=127', (res) => {
      if (res.data) {
	      //将markdown内容转换为towxml数据
        let articleData = app.towxml.toJson(res.data,'markdown');
        
        articleData = app.towxml.initData(articleData,{
          base:'https://www.vvadd.com/',
          app:_ts
        });

        articleData.theme = 'light';

        //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
        //例如`bind:touchstart`则为：
        this['event_bind_touchstart'] = (event)=>{
          console.log(event.target.dataset._el);     // 打印出元素信息
        };

        // 给todoList添加监听事件
        this['eventRun_todo_checkboxChange'] = (event)=>{
          console.log(event.detail);                // todoList checkbox发生change事件
        };

        //设置文章数据，并清除页面loading
        _ts.setData({
          article: articleData,
          isloading: false
        });
      };
    });
  }
})
*/