<script>
import { onMount } from "svelte";
import auth from "../lib/auth"
import Loading from "../lib/loader.svelte"
import API from "../lib/api"
import {Button} from "svelte-materialify";

let errorMessage = ""
let loading = true;
let auth0;
onMount(async () => {
auth0  = await auth.createClient();


try {
    try{
        const redirectResult = await auth0.handleRedirectCallback();

    }catch(e) {
        // errorMessage = e.message
    }
    //logged in. you can get the user profile like this:
    const user = await auth0.getUser();
    if(typeof user == "undefined") loading = false
    else {
        let token = await auth0.getTokenSilently()

        window.location = "/app"
    }


}catch (e) {
    errorMessage = e.message;
}

});

</script>
<svelte:head>
    <title>Αυθεντικοποίηση | po/iw</title>
</svelte:head>

{#if !errorMessage}
    {#if loading}
        <span class="flex pb-20"><Loading/></span>
    {:else}
        <div class={`w-full min-h-[100vh] flex items-center justify-center`}>
            <div class={`flex flex-col justify-center items-center py-32`}>
                <div class="flex gap-10">
                    <img src={`/logo.png`} class={`w-40`}/>
                </div>
                <span class={`mt-10 flex gap-4 items-center justify-center`}>
<!--            <button class={`py-4 px-6 text-purple-700`} on:click={auth0.loginWithRedirect()}>Είσοδος</button>-->
                      <Button text on:click={auth0.loginWithRedirect()}>ΣΥΝΔΕΣΗ</Button>
<!--            <button class={`py-4 px-10 bg-purple-700 rounded-full text-white shadow-xl`} >Εγγραφή</button-->
                    <Button class="primary-color" on:click={auth0.loginWithRedirect({screen_hint: "signup"})}>ΕΓΓΡΑΦΗ</Button>
        </span>
            </div>
        </div>
    {/if}
{/if}
{#if errorMessage}
    <span class="flex px-10 pt-20 w-full justify-center items-center flex-col gap-6">
        <span>An error occurred while trying to login. Try to clear your session data.</span>
        <p class="text-gray-300">Error: {errorMessage}</p>
    </span>
{/if}
