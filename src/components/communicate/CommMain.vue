<template>
  <div id="comm-main" class="module-box">
    <!--标题-->
    <div class="module-head clearfix">
      <h3>分享与交流</h3>
      <div class="module-head-oprt">
        <a class="el-button el-button--primary" type="button" href="">
          <i class="ico-submit"></i>
          我要发布
        </a>
      </div>
    </div>
    <!--讨论的分类标签-->
    <div class="discuss-tab-wrap">
      <a href="" class="discuss-tab selected">全部</a>
      <a href="" class="discuss-tab">其它1</a>
      <a href="" class="discuss-tab">其它2</a>
      <a href="" class="discuss-tab">其它3</a>
    </div>
    <!--菜单盒子-->
    <div class="menu-txt-box">
      <ul class="menu-txt clearfix">
        <li class="selected">
          <a href="">最新回复</a>
        </li>
        <li class="menu-pipe">|</li>
        <li>
          <a href="">最新发表</a>
        </li>
        <li class="menu-pipe">|</li>
        <li>
          <a href="">最热</a>
        </li>
        <li class="menu-pipe">|</li>
        <li>
          <a href="">精华</a>
        </li>
      </ul>
    </div>
    <!--主要内容区域-->
    <div class="module-body">
      <ul class="common-list">
        <li class="clearfix">
          <a class="head-pic" data-card-uid="63" href="/profile/63
" data-card-index="1"><img alt="头像" src="https://images.nowcoder.com/images/20180102/63_1514861814371_E573EC9DA05DFAC7340D94F1A6D246E3@0e_100w_100h_0c_1i_1o_90Q_1x"></a>
          <div class="discuss-detail">
            <div class="discuss-main clearfix">
              <a href="/discuss/139360?type=0&amp;order=0&amp;pos=1&amp;page=3" target="_blank">
                2019补招｜互联网名企2019应届生补招专场合集
                <span class="disTop">置顶</span>
                <span class="plusFine">精</span>
                <img class="tag-img" src="https://static.nowcoder.com/images/discuss/icon-certify.png">
                <img class="tag-img" src="https://static.nowcoder.com/images/discuss/icon-hot.png">
              </a>
              <a href="/discuss/139360?type=0&amp;order=0&amp;pos=1&amp;page=3" target="_blank">
              </a>
              <a href="/discuss/tag/862?type=0" class="tag-label" target="_blank">校招</a>
            </div>
            <div class="feed-foot clearfix">
              <div class="feed-origin">
                <p class="feed-tip">
                  <a class="d-name level-color-9" data-card-uid="63" href="/profile/63
" data-card-index="2">
                    筱茜</a>
                  <a href="/user/authentication" class="" target="_blank" data-title="人工智能运营茜" data-tips-index="1"><img class="identity-icon" data-identity="1" src="//static.nowcoder.com/nc/image/identity/1.png"></a>
                  &nbsp;&nbsp;
                  2018-11-03&nbsp;&nbsp;
                  发表在&nbsp;<a href="/discuss?type=7">[招聘信息]</a>&nbsp;&nbsp;
                  最后回复&nbsp;&nbsp;1天前
                </p>
              </div>
              <div class="feed-legend">
                <span>回复<span class="feed-legend-num">50</span></span>
                <span class="feed-legend-pipe">|</span>
                <span>赞<span class="feed-legend-num">30</span></span>
                <span class="feed-legend-pipe">|</span>
                <span>浏览<span class="feed-legend-num">117925</span></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommMain"
  }
</script>

<style scoped>
  #comm-main {
    /*background-color: antiquewhite;*/
    height: 100%;
    flex: 5;
  }

  /*-----------------------------------------------------------*/

  .module-head h3 {
    float: left;
  }

  .module-head .module-head-oprt {
    float: right;
  }

  /*-----------------------------------------------------------*/

  .discuss-tab-wrap {
    background: #f5f5f5;
    padding: 15px 15px 10px;
    margin: 10px 0 0;
  }

  .discuss-tab {
    padding: 0 5px;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    white-space: nowrap;
    font-size: 14px;
    margin: 0 10px 5px 0;
  }

  .discuss-tab.selected {
    background: #25bb9b;
    color: #fff;
    text-align: center;
  }

  /*-----------------------------------------------------------*/

  .menu-txt {
    letter-spacing: -4px;
    white-space: nowrap;
  }

  .menu-txt li {
    letter-spacing: 0;
    display: inline-block;
    margin-right: 1px;
    position: relative;
  }

  .menu-pipe {
    padding: 0 8px;
    color: #959595;
    vertical-align: 1px;
  }

  /*-----------------------------------------------------------*/

  .head-pic {
    border-radius: 50%;
    display: block;
    float: left;
    height: 50px;
    margin-right: 10px;
    overflow: hidden;
    width: 50px;
  }

  .head-pic img{
    width: 100%;
  }

  .discuss-detail {
    float: left;
    line-height: 1.5;
    width: 585px;
    margin-top: 5px;
  }

  .discuss-main {
    font-size: 14px;
  }

  .feed-foot {
    color: #999;
    margin-top: 5px;
    white-space: nowrap;
  }

  .feed-origin {
    float: left;
  }

  .feed-legend {
    float: right;
    color: #999;
  }
</style>
