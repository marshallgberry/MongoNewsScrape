

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://wwww.nytimes.com", function(err,res,body) {

    var $ = cheerio.load(body);

    var articles = [];

    $(".css-180b3ld").each(function(i, element) {

        var head = $(this).children(".css-8uvv5f esl82me1").text().trim();
        var sum = $(this).children(".css-ba1f3o e1n8kpyg0").text().trim();

        if(head && sum) {
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };

            articles.push(dataToAdd);
        }
    });
    cb(articles);
    });
};
module.exports = scrape;