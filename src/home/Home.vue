<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 col-xs-12">
				<div class="class-sort-btn-section">
					<ul class="sort-btn pull-left">
						<li class="active filter" data-filter="mix">
							<a href="#">全部</a>
						</li>
						<!-- <li class="filter" data-filter="kinder" id="kinder">
							<a href="#">山地</a>
						</li>
						<li class="filter" data-filter="play" id="play">
							<a href="#">湖泊</a>
						</li>
						<li class="filter" data-filter="primary" id="primary">
							<a href="#">草原</a>
						</li>
						<li class="filter" data-filter="story" id="story">
							<a href="#">沙漠</a>
						</li> -->
					</ul>
					<!-- <form method="post" action="#" class="class-search pull-right">
						<input type="search" name="search" placeholder="搜索实习相关内容">
						<button type="submit">
							<i class="fa fa-search"></i>
						</button>
					</form> -->
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div id="mixer">
				<div class="col-sm-4 col-xs-12 kinder play" v-for="(item,index) in data.project" :key="item.experimentid">
					<div class="single-class">
						<div class="class-img">
							<img :alt="index" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup">
									<i class="icon-link"></i>
								</a>
							</div>
						</div>
						<div class="class-details">
							<h3>
								<a :href="'/project?url=' + item.experimenturl">{{ item.experimentname }}</a>
							</h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>24</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.11</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="col-sm-4 col-xs-12 mix primary story">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">黄山虚拟仿真实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>20</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.12</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix kinder primary">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">神龙架虚拟仿真实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>15</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.7</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-sm-4 col-xs-12 mix story kinder">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">鄱阳湖虚拟仿真实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>湖泊</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>24</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.12</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix kinder play">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">普达措虚拟野外实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>草原</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>20</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.12</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix primary story">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">泰山虚拟野外实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>15</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.6</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix kinder primary">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">华山虚拟野外实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>24</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.1</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix play story">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">张家界虚拟野外实训</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>20</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.3</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-4 col-xs-12 mix kinder play">
					<div class="single-class">
						<div class="class-img">
							<img alt="" src="/webStatic/index/images/home1/Mount1.jpg">
							<div class="class-hover">
								<a href="/webStatic/index/images/home1/Mount1.jpg" class="popup"><i class="icon-link"></i></a>
							</div>
						</div>
						<div class="class-details">
							<h3><a href="class.html">武夷山虚拟野外实习</a></h3>
							<p>负责人姓名</p>
							<div class="clearfix">
								<div class="class-meta pull-left">
									<span>类型</span>
									<p>山地</p>
								</div>
								<div class="class-meta pull-left">
									<span>学时</span>
									<p>15</p>
								</div>
								<div class="class-meta pull-left">
									<span>上传时间</span>
									<p>2018.7.10</p>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-xs-12 text-center">
				<ul class="paginations">
					<li :class="{active: n == data.currentPage}" v-for="n in data.maxPage" :key="n">
						<a @click='postGetExperiment(n)' href="jacascript::void(0);">{{ n }}</a>
					</li>
					<li>
						<a @click='postGetExperiment(data.currentPage + 1)' href="jacascript::void(0);">
							<i>Next</i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Axios, { AxiosResponse } from 'axios';
import DebugLog from '@/lib/DebugLog';
import GetData from './GetData';

@Component
export default class Home extends Vue {
  private name: string = 'container';
  private data: any = null;
  private postGetExperiment(page: number) {
    this.data = GetData.postGetExperiment(page);
  }

  private created() {
    this.postGetExperiment(1);
  }
}
</script>

<style scoped>
a {
  cursor: pointor !important;
}
</style>
