<template>
  <div id='toolbar'>

		<!-- Page Wrapper -->
			<div id='page-wrapper'>

				<!-- Header -->
					<header id='header' class='alt'>
						<h1><a href='index.html'>VR Practical</a></h1>
						<nav id='nav'>
							<ul>
								<li class='special'>
									<a href='#menu' class='menuToggle'><span>Menu</span></a>
									<div id='menu'>
										<ul>
											<li><a href="home.html">Home</a></li>
											<li><a href="Login.html">Sign Up</a></li>
											<li ><a href="Login.html">Log In</a></li>
										</ul>
									</div>
								</li>
							</ul>
						</nav>
					</header>

				<!-- Banner -->
					<section id='banner'>
						<div class='inner'>
							<h2>VR Practical</h2>
							<p>一个全面的<br />
							虚拟仿真<br />
							野外实训平台<br /> <a href='#'>by Wuhan University</a>.</p>
							<ul class='actions'>
								<li><a href='#' class='button special'>开始模拟实训</a></li>
							</ul>
						</div>
						<a href='#one' class='more scrolly'>Learn More</a>
					</section>
			</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';

  private data() {
    return {};
  }
}
</script>


<style>
#toolbar {
  width: 20%;
  float: right;
}
</style>
