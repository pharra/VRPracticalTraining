<template>
    <!-- Header Area -->
    <header class="header-area inner-page">
        <!-- Header Top Area -->
        <!-- <section class="header-top">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <div class="header-elements pull-right">
                            <div class="language pull-left">
                                <a href="#">
                                    <i class="icon-translator"></i>
                                    <span>中文</span>
                                    <i class="fa fa-angle-down"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- /.header-top -->
        <nav class="navigation">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <div class="logo pull-left">
                            <a href="/">
                                <img alt="VR Practical" src="/webStatic/index/images/home1/logo.png" style="height: 45px;">
                            </a>
                        </div>
                        <ul class="main-menu pull-right">
                            <li>
                                <a href="/home">主页</a>
                            </li>
                            <!-- <li><a href="about-us.html">关于</a></li> -->
                            <!-- <li class="menu-has-child">
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
						</li> -->
                            <li v-if="data.login == 0">
                                <a href="/login">登录</a>
                            </li>
                            <li v-if="data.login == 0">
                                <a href="/login?method=resigister">注册</a>
                            </li>
                            <li class="menu-has-child" v-if="data.login == 1">
                                <a>{{ data.content.nickname }}</a>
                                <ul>
                                    <!-- <li>
                                        <a href="routine.html">用户指南</a>
                                    </li> -->
                                    <li>
                                        <a href="/api/post_logout">注销</a>
                                    </li>
                                </ul>
                            </li>
                            <!-- <li>
                                <a href="#" id="search-pop">
                                    <i class="fa fa-search"></i>
                                </a>
                            </li> -->
                        </ul>
                        <!-- <div class="mobile-menu hidden-lg hidden-md hidden-sm">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- <div class="search-area">
			<form action="#" method="post">
				<input type="search" name="search" placeholder="Enter your Search Text Here....">
			</form>
			<a href="#" class="search-close"><i class="fa fa-times"></i></a>
		</div> -->
        </nav>
    </header>
    <!-- /.header-area -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Axios, { AxiosResponse } from 'axios';
import DebugLog from '@/lib/DebugLog';
import GetData from './GetData';

@Component
export default class Navibar extends Vue {
  private name: string = 'Navibar';
  private data: any = null;

  private postUserInfo() {
    this.data = GetData.postUserInfo();
  }

  private created() {
    this.postUserInfo();
  }
}
</script>

<style scoped>
</style>
