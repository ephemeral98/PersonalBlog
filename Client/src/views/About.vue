<template>
  <v-main class="home">
    <TopBar />

    <!-- <CompHead>关于我</CompHead> -->
    <header class="welcome_head">
      <CentralWord welcomeWord="关于我" />
      <EnterMain></EnterMain>
    </header>

    <MyContainer>
      <div class="wrapper">
        <h1>Hello，欢迎来到我的博客</h1>
        <div class="content mt-5">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro,
            rerum.
          </p>
          <p>
            Obcaecati praesentium aliquid odio explicabo minima veritatis
            deleniti adipisci cum.
          </p>
          <p>
            Velit aperiam dicta, rem dignissimos magni delectus commodi. Qui,
            eum.
          </p>
          <p>
            Quae minus amet placeat ea tenetur dolor dolores, numquam totam.
          </p>
          <p>Earum molestiae nemo dolor impedit ipsa vero nostrum quo eaque.</p>
          <p>
            Accusantium praesentium minima repellat eum doloremque totam
            numquam, consequatur ea.
          </p>
          <p>
            Optio, accusamus. Consectetur deserunt natus quia quod reprehenderit
            placeat inventore!
          </p>
          <p>Quae ipsam a sapiente itaque facilis numquam eaque labore in!</p>
          <p>
            Distinctio suscipit autem ipsam officiis aut aliquam, facere id.
            Facere?
          </p>
          <p>
            Doloremque, nam! Voluptate fugit eligendi rem aliquid, facilis dolor
            sapiente.
          </p>
        </div>
      </div>
    </MyContainer>

    <MyFoot />
  </v-main>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/common/TopBar";
import MyContainer from "@/components/common/MyContainer.vue";
import MyFoot from "@/components/common/MyFoot.vue";
import CentralWord from "@/components/common/CentralWord";
import EnterMain from "@/components/common/CentralWord/EnterMain.vue";
// import Test from "@/components/common/Test.vue";

export default {
  name: "Home",
  components: {
    TopBar,
    CentralWord,
    EnterMain,
    MyContainer,
    MyFoot
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  @include borderShadow;

  &:hover {
    transform: translateY(7px);
  }
}
</style>
