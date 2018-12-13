<template>
	<b-navbar toggleable="md" type="dark">

		<b-nav-toggle target="nav_collapse"></b-nav-toggle>

		<b-collapse is-nav id="nav_collapse">
			<b-navbar-nav>
				<b-nav-item active>про мене</b-nav-item>
				<b-nav-item>послуги</b-nav-item>
				<b-nav-item>партнери</b-nav-item>
				<b-nav-item disabled>кейси</b-nav-item>
			</b-navbar-nav>
		</b-collapse>

		<b-navbar-brand to="/" right>
			<div v-html="logoSvg"></div>
		</b-navbar-brand>
	</b-navbar>
</template>

<script>
  import logoSvg from '../assets/img/logo.svg';

  export default {
    data() {
      return {
        logoSvg
      }
    }
  }
</script>