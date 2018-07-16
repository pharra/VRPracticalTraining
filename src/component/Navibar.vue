<template>
  <div id='Navibar'>
			
				<!-- Header -->
  <header class="header-area inner-page">
	<!-- Header Top Area -->
   <section class="header-top">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-xs-12">
					<div class="header-elements pull-right">
						<div class="language pull-left">
							<a href="/home">
								<i class="icon-user"></i><span><h3>Home</h3></span>
							</a>
						</div>
						<div class="login-or-signup pull-left">
							<a href="/login"><i class="icon-user"></i><span><h3>Login/sign up</h3></span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
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