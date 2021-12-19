<MaterialApp>
    <div class="w-full min-h-[100vh] flex flex-col gap-10 justify-center items-center px-8 md:px-20 py-20">
        {#if loading}
            <Loading/>
            {:else if user?.status == 0}
            <Dialog bind:active width="1000" persistent="true">
                <Card style="z-index: 99">
                    <CardTitle>
                        <h5>Ας γνωριστούμε...</h5>
                    </CardTitle>
                    <CardText>
                    <p>Χρειαζόμαστε μερικές πληροφορίες ακόμη για να ολοκληρώσουμε τον λογαριασμό σου...</p>
                    <TextField outlined value={user.fullName} rules={nameRules}>Ονοματεπώνυμο</TextField>
                    <Select outlined value={user.occupation} {items}>Φοιτητική Ιδιότητα</Select>

                    </CardText>
                    <CardActions class="justify-end mt-10">
                        <Button on:click={close} text>ΑΠΟΘΗΚΕΥΣΗ</Button>
                    </CardActions>
                </Card>
            </Dialog>
        {:else if user?.status == 1}
            <Dialog bind:active persistent="true">
                <Card style="z-index: 99">
                    <CardTitle>
                        <h5>Σύνδεση Discord</h5>
                    </CardTitle>
                    <CardText>
                        <p>Όλη η επικοινωνία της ομάδας, οι ανακοινώσεις και οι ειδοποιήσεις χρήσης της κάρτας εισόδου στο εργαστήριο γίνονται μέσω του <b>Discord</b>.</p>
                        <p>Θα ανακατευθυνθείς στο Discord, έτσι ώστε να δημιουργήσεις ένα λογαριασμό (αν δεν έχεις ήδη) και να τον συνδέσεις με τον λογαριασμό σου στο po/iw. </p>
                    </CardText>
                    <CardActions class="justify-end mt-10">
                        <Button on:click={close} text>ΜΕΤΑΒΑΣΗ ΣΤΟ DISCORD</Button>
                    </CardActions>
                </Card>
            </Dialog>
            {:else}
            Προέκυψε ένα σφάλμα
        {/if}
    </div>
</MaterialApp>

<script lang="ts">

    export let hydrate = false;

    import { Button,
        Dialog,
        Card,
        CardTitle,
        CardText,
        CardActions,
        TextField,
        Row,
        Select,
        Col,Tooltip, Icon, MaterialApp } from 'svelte-materialify';
    import {onMount} from "svelte";
    import auth from "$lib/auth";
    import API from "$lib/api";
    import {TextField} from "svelte-materialify";
    import User from "$lib/user"
    import Loading from "$lib/loader.svelte"
    import type {AccountStatus} from "$lib/accountStatus.js";


    let active = true;

    const nameRules = [
        (value) => {
            if (!new RegExp(/^[Α-Ω\s]*$/).test(value)) return 'Επιτρέπονται μόνο ελληνικοί κεφαλαίοι χαρακτήρες';
            return false;
        },
    ];

    const items = [
        { name: 'Φοιτώ στο ΕΛ.ΜΕ.ΠΑ.', value: "1" },
        { name: 'Φοιτώ στο Πανεπιστήμιο Κρήτης', value: "2" },
        { name: 'Άλλο', value: "0" },
    ];

    function close() {
        active = false;
    }

    let loading = true;
    let user: User;
    onMount(async ()=>{
        if(!(await auth.isAuthenticated())) window.location = "/auth"

        await getBarcodes()

    })


    let getBarcodes= async () => {
        let token = await auth.getToken()
        let {data} = await API.get("/user",
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        user = User.fromJSON(data)
        loading = false;
    }
</script>

<style>

</style>