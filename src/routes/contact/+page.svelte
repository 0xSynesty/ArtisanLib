<script type="text/javascript">
    window.onload = () => {
        const api = new JitsiMeetExternalAPI("8x8.vc", {
            roomName:
                "vpaas-magic-cookie-bad1bb18b6ac4a86b2c8ef53c181497a/SampleAppBoringDisadvantagesMatureInstantly",
            parentNode: document.querySelector("#jaas-container"),
            // Make sure to include a JWT if you intend to record,
            // make outbound calls or use any other premium features!
            // jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtYmFkMWJiMThiNmFjNGE4NmIyYzhlZjUzYzE4MTQ5N2EvYWNlYjM1LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2OTY4NTYwNjAsImV4cCI6MTY5Njg2MzI2MCwibmJmIjoxNjk2ODU2MDU1LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtYmFkMWJiMThiNmFjNGE4NmIyYzhlZjUzYzE4MTQ5N2EiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwic2lwLW91dGJvdW5kLWNhbGwiOmZhbHNlLCJ0cmFuc2NyaXB0aW9uIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZX0sInVzZXIiOnsiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlLCJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTE3MjA4NzExMzk1NDU2MzMwMTI4IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX0sInJvb20iOiIqIn0.PxAN2urhiuBOMO5L7VL4l93to5Q8VaYfERHq-e07tzIs1gEWwb-8GYiq2hsf9J9-E-3NdJSO13o6a8LYiBYi5x0yxvq8zkMDo6TyghFbL_0_jeOhJYbEL210DCsoArPOXvadI7J4Hj9SsQx8RZyYvVULH7nPk27O5hanaoD64gVSxF-i--QGsTbAly-5f0DfdbojQZkHdZLPHHau7YGP8QYVT0lDI_nkmKuE3vO27NTgLBXcI1XB5A9quKpK-eVWboRvYhguDwc5Qn9wNkcWLq7rLFvnJKJn1DQ3HrnBtWndggfJyqB12hfiqoPbg0uSJipvIh1_jlDNYzpCVx0Kyw"
        });
    };
</script>

<svelte:head>
    <script src='https://8x8.vc/vpaas-magic-cookie-bad1bb18b6ac4a86b2c8ef53c181497a/external_api.js' async></script>
</svelte:head>

<div id="jaas-container" />

<style>
    #jaas-container {
        height: 100%;
    }
</style>
