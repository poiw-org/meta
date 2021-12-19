
<script>
    import { onMount } from "svelte";
    import auth from "../lib/auth"
    import Loading from "../lib/loader.svelte"
    import API from "../lib/api"
    let errorMessage = ""
    let register, login;
    onMount(async () => {
        if(!(await auth.isAuthenticated())) window.location = "/auth"
        else window.location = "/app"
    });
</script>
<Loading/>