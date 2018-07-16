<template>
  <div id='Navibar'>
			
				<!-- Header -->
  <header class="header-area inner-page">
	<nav class="navigation">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-xs-12">
					<div class="logo pull-left">
						<a href="/home"><img alt="VR Practical" src="/webStatic/index/images/home1/logo.png" style="height: 45px;"></a> 
					</div>
					<ul class="main-menu pull-right">
						<li><a href="/home">主页</a></li>
						<li><a href="about-us.html">关于</a></li>
						<li class="menu-has-child">
							<a href="#">帮助</a>
							<ul>
								<li>
									<a href="event.html">产品</a>
									<ul>
										<li><a href="event-details.html">产品细节</a></li>
									</ul>
								</li>
								<li><a href="routine.html">用户指南</a></li>
								<li><a href="contact.html">联系我们</a></li>
							</ul>
						</li>
			
							<li><a href="/login">登陆</a></li>
							<li><a href="/login">注册</a></li>
						
						<li>
							<a href="#" id="search-pop"><i class="fa fa-search"></i></a>
						</li>
					</ul>
					<div class="mobile-menu hidden-lg hidden-md hidden-sm">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>

 </div>

</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navibar extends Vue {
  private el: string = '#Navibar';
  private name: string = 'Navibar';

  private data() {
    return {};
  }
}
</script>


<style>
#Navibar {
  height: 6%;
  touch-action: none;
}
</style>