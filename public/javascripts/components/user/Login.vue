<template>
<div class="container text-center">
  <div class="row">
    <form class="form-signin" action="/login" method="POST"><img class="mb-4" src="../../images/princess_leia.svg" alt="" width="150" height="150" />
      <div class="form-group">
        <input class="form-control" id="inputEmail" type="email" aria-describedby="emailHelp" required="" name="email" placeholder="Enter email" />
      </div>
      <div class="form-group">
        <input class="form-control" id="inputPassword" type="password" name="password" required="" placeholder="Password" />
      </div>
      <button class="btn btn-primary col-md-12" type="submit">Login <i class="fas fa-arrow-circle-right"></i></button>
    </form>
  </div>
</div>
</template>


<script>
export default {
  data: {
    
  }
};
</script>

<style>
</style>


