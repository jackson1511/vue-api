<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/post">Posts</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
