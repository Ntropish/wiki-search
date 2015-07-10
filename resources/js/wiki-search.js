/**
 * Created by Justin on 7/9/2015.
 */

/* global $: false, console: false */
$(document).ready(function(){
    'use strict';
    function search() {
        var results = $('#search-results');
        var searchQuery = $('#search-input').val();
        console.log(searchQuery);
        results.empty();

        $.getJSON( endpoint,
            {
                srsearch: searchQuery,
                action: 'query',
                list: 'search',
                format: 'json'
            },
            function(data) {
                if (data.query !== undefined) {
                data.query.search.forEach(function (result) {
                    console.log('query');
                    var link = result.title.replace(/ /g, '_');
                    results.append('<a target="_blank" href="https://en.wikipedia.org/wiki/' +
                        link +
                        '"><div class="result"><h3>' +
                        result.title + '</h3><div class="snippet">' +
                        result.snippet +
                        '</div></div></a>');
                });
                } else {
                    console.log('no query');
                }
            });


    }
    var endpoint = 'https://en.wikipedia.org/w/api.php?callback=?';
    var searchBox = $('#search-box');
    var searchBar = $('#search-bar-container');
    var searchInput = $('#search-input');
    var searchButton = $('#search-button');
    searchBox.one( 'click' , function(){
        searchBox.remove();
        $('#search-click-prompt').remove();
        $('#content').prepend(searchBar);
        searchBar.find('#search-input').focus();
        $('#background-image').addClass('fade-translucent');

        //only move the search bar up once per input type
        //only happens once but twice doesn't matter
        searchButton.one('click', function(){
            searchBar.removeClass('push-down');
            $('#search-results').removeClass('hidden');
        });
        searchInput.one('enterKey', function(){
            searchBar.removeClass('push-down');
            $('#search-results').removeClass('hidden');
        });

        //bind events to the new search bar
        searchButton.on('click', function(){
            search();
        });
        searchInput.on('enterKey', function(){
            search();
        });
        searchInput.keyup(function(e){
            if(e.keyCode === 13) {
                $(this).trigger('enterKey');
            }
        });
    });

});