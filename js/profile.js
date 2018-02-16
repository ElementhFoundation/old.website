$(function () {

    $('#profile_dropdown').on('click', function () {
        $('#profile_tabs_list').addClass('disblock')
    })
    $('#tabs_list_contribute, #tabs_list_pool, #tabs_list_bounty, #tabs_list_airdrop, #tabs_list_referral, #tabs_list_profile').on('click', function () {
        $('#profile_tabs_list').removeClass('disblock')
        $('#tabs_list_contribute').removeClass('active')
        $('#tabs_list_pool').removeClass('active')
        $('#tabs_list_bounty').removeClass('active')
        $('#tabs_list_airdrop').removeClass('active')
        $('#tabs_list_referral').removeClass('active')
        $('#tabs_list_profile').removeClass('active')
        $('#tabs_container_contribute').removeClass('disblock')
        $('#tabs_container_pool').removeClass('disblock')
        $('#tabs_container_bounty').removeClass('disblock')
        $('#tabs_container_airdrop').removeClass('disblock')
        $('#tabs_container_referral').removeClass('disblock')
        $('#tabs_container_profile').removeClass('disblock')
    })
    $('#tabs_list_contribute').on('click', function () {
        $('#tabs_list_contribute').addClass('active')
        $('#tabs_container_contribute').addClass('disblock')
    })
    $('#tabs_list_pool').on('click', function () {
        $('#tabs_list_pool').addClass('active')
        $('#tabs_container_pool').addClass('disblock')
    })
    $('#tabs_list_bounty').on('click', function () {
        $('#tabs_list_bounty').addClass('active')
        $('#tabs_container_bounty').addClass('disblock')
    })
    $('#tabs_list_airdrop').on('click', function () {
        $('#tabs_list_airdrop').addClass('active')
        $('#tabs_container_airdrop').addClass('disblock')
    })
    $('#tabs_list_referral').on('click', function () {
        $('#tabs_list_referral').addClass('active')
        $('#tabs_container_referral').addClass('disblock')
    })
    $('#tabs_list_profile').on('click', function () {
        $('#tabs_list_profile').addClass('active')
        $('#tabs_container_profile').addClass('disblock')
    })

    $('#airdrop_verify_email').on('click', function () {
        $('#airdrop_user_email_edit').addClass('disnone')
        $('#airdrop_verify_email').addClass('disnone')
        $('#airdrop_confirmed_email').addClass('disblock')
    })
    $('#airdrop_verify_telegram').on('click', function () {
        $('#airdrop_user_telegram_edit').addClass('disnone')
        $('#airdrop_verify_telegram').addClass('disnone')
        $('#airdrop_confirmed_telegram').addClass('disblock')
    })

    $('#verify_email').on('click', function () {
        $('#user_email_edit').addClass('disnone')
        $('#verify_email').addClass('disnone')
        $('#confirmed_email').addClass('disblock')
    })
    $('#verify_telegram').on('click', function () {
        $('#user_telegram_edit').addClass('disnone')
        $('#verify_telegram').addClass('disnone')
        $('#confirmed_telegram').addClass('disblock')
    })
});