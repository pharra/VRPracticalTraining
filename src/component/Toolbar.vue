<template>
  <div id='toolbar'>

		<!-- Page Wrapper -->
			<div id='page-wrapper'>

				<!-- Header -->

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
	height: 94%;
  float: right;
}
</style>
