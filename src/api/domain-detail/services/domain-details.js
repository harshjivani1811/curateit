'use strict';

const mql = require('@microlink/mql');
const axios = require('axios');
const puppeteer = require('puppeteer');
const { Readability } = require('@mozilla/readability');
const { JSDOM, VirtualConsole } = require('jsdom');
const getColors = require('get-image-colors');


/**
 * domain-details service
 */

module.exports = () => ({
    getDomainDetails: async (url) => {
        let urldata
        let githubURL
        let linkURL
        let trafficURL
        // let webcontactURL
        let sociallinkURL
        let categoryURL
        let excerptsURL
        let textURL
        let htmlURL
        let spotifyURL
        let soundcloudURL
        let redditURL
        let producthuntURL
        let imdbURL
        let amazonURL
        let instagramURL
        let tiktokURL
        let youtubeURL
        let emailURL
        let phonenumberURL
        let twitterURL
        let technologystackURL
        let fullscreenshotURL
        let screenshotURL
        let healthcheckURL
        let embedURL
        let imagecolorURL
        let digitalrankURL
        // let logoURL
        console.log(url, "before");

        url.map((data) => {
            console.log(data, "Data");
            // switch (url) {
            //     case url.field === 'url' :
            //         urldata = url.value;
            //         console.log("seutch", urldata);
            //     break;

            //     case url.field === "url" && url.value === 'https://spotify.com' :
            //          urldata = url.value;
            //     break;

            //     default:
            //         break;
            // }
            if (data.field === 'url') {
                urldata = data.value;
            }
            if (data.field === "url" && data.value === 'https://spotify.com') {
                spotifyURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://soundcloud.com') {
                soundcloudURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://reddit.com') {
                redditURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://producthunt.com') {
                producthuntURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://imdb.com') {
                imdbURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://amazon.com') {
                amazonURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://instagram.com') {
                instagramURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://tiktok.com') {
                tiktokURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://youtube.com') {
                youtubeURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://twitter.com') {
                twitterURL = data.value;
            }
            if (data.field === 'url' && data.value === 'https://github.com') {
                githubURL = data.value;
            }
            if (data.field === 'email' && data.value === 'yes') {
                emailURL = data.value;
            }
            if (data.field === 'phonenumber' && data.value === 'yes') {
                phonenumberURL = data.value;
            }
            if (data.field === 'imagecolor' && data.value === 'yes') {
                imagecolorURL = data.value;
            }
            if (data.field === 'html' && data.value === 'yes') {
                htmlURL = data.value;
            }

            if (data.field === 'link' && data.value === 'yes') {
                linkURL = data.value;
            }
            if (data.field === 'traffic' && data.value === 'yes') {
                trafficURL = data.value;
            }
            // if (data.field === 'webcontact' && data.value === 'yes') {
            //     webcontactURL = data.value;
            // }
            if (data.field === 'sociallink' && data.value === 'yes') {
                sociallinkURL = data.value;
            }
            if (data.field === 'category' && data.value === 'yes') {
                categoryURL = data.value;
            }
            if (data.field === 'excerpts' && data.value === 'yes') {
                excerptsURL = data.value;
            }
            if (data.field === 'text' && data.value === 'yes') {
                textURL = data.value;
            }
            if (data.field === 'technologystack' && data.value === 'yes') {
                technologystackURL = data.value;
            }
            if (data.field === 'fullscreenshot' && data.value === 'yes') {
                fullscreenshotURL = data.value;
            }
            if (data.field === 'screenshot' && data.value === 'yes') {
                screenshotURL = data.value;
            }
            if (data.field === 'healthcheck' && data.value === 'yes') {
                healthcheckURL = data.value;
            }
            if (data.field === 'embed' && data.value === 'yes') {
                embedURL = data.value;
            }
            if (data.field === 'digitalrank' && data.value === 'yes') {
                digitalrankURL = data.value;
            }
            if (data.field === 'logo' && data.value === 'yes') {
                logoURL = data.value;
            }
        })
        console.log(urldata, "urlData");
        
        // microlinkData
        const { status, data, response } = await mql(urldata);
        console.log("microlink");

        // iframelyData
        const iframely = await axios.get(`https://iframe.ly/api/iframely?url=${urldata}/&api_key=${process.env.IFRAMELY_API_KEY}&iframe=1&omit_script=1`);

        const coreData = {
            iframely: iframely.data,
            publisher: data.publisher,
            lang: data.lang,
            author: data.author,
            date: data.date,
        }
        console.log("core");

        // htmlData
        const htmlData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                meta: false,
                data: {
                    html: {
                        selector: 'html'
                    }
                },
            })
        console.log("html");

        // linkData
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = (await browser.pages())[0];
        await page.goto(urldata);
        const hrefs = await page.$$eval('a', as => as.map(a => a.href));
        await browser.close();
        console.log("link");

        // textData
        const window = await puppeteer.launch({
            headless: true
        });
        const list = (await window.pages())[0];
        await list.goto(urldata);

        const extractedText = await list.$eval('*', (el) => el.innerText);
        await window.close();
        console.log("text");

        // traficData
        const traficData = await axios.get(`https://api.hexomatic.com/v2/app/services/v1/workflows/${process.env.WORKFLOW_ID}?key=${process.env.TRAFFIC_API_KEY}`)
        console.log("traffic");

        // email and phonenumber array
        // webcontactData
        let emailsArr = [];
        let phoneNumArr = [];

        const webcontact = await axios.get(`https://website-contacts.whoisxmlapi.com/api/v1?apiKey=${process.env.WEB_CONTACT_KEY}&domainName=${urldata}`)
        let webcontactData = {
            emails: webcontact.data.emails,
            phones: webcontact.data.phones
        }

        webcontactData.emails.map(data => {
            emailsArr.push(data.email)
        });

        webcontactData.phones.map(data => {
            phoneNumArr.push(data)
        });
        console.log("webcontact");

        // emailData
        const emailData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                meta: false,
                data: {
                    emails: {
                        selector: 'body',
                        type: 'email'
                    }
                }
            });

        if (emailData.data.emails === null) {
            emailsArr
        } else {
            emailData.data.emails.map(data => {
                emailsArr.push(data);
            })
        }
        console.log("email<=>>>>");

        // sociallinkData
        const sociallinkData = await axios.get(`https://website-contacts.whoisxmlapi.com/api/v1?apiKey=${process.env.WEB_CONTACT_KEY}&domainName=${urldata}`)
        console.log("sociallink");

        // category
        const categoryData = await axios.get(`https://website-categorization.whoisxmlapi.com/api/v2?apiKey=${process.env.WEB_CONTACT_KEY}&domainName=${urldata}`)
        let categoryArr = []
        categoryData.data.categories.map(data => {

            if (data.tier1 === null) {
                categoryArr
            } else {
                categoryArr.push(data.tier1.name)
            }
            console.log("catgery 2 start");
            if (data.tier2 === null) {
                categoryArr
            } else {
                categoryArr.push(data.tier2.name)
            }
        })
        console.log("categoty");

        // excerptData
        const code = async ({ url, html }) => {

            const dom = new JSDOM(html, {
                url,
                virtualConsole: new VirtualConsole()
            })

            const reader = new Readability(dom.window.document)
            return reader.parse().excerpt
        }
        const excerpts = (url, props) => {
            return mql(url, { function: code.toString(), meta: false, ...props }).then(
                ({ data }) => data.function
            )
        }
        const excerptsData = await excerpts(urldata)
        console.log("excerts");

        // githubData
        let githubRes
        if (githubURL === "https://github.com") {
            console.log("github");
            const githubData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        stats: {
                            selector: '.application-main',
                            attr: {
                                followers: {
                                    selector: '.js-profile-editable-area a[href*="tab=followers"] span',
                                    type: 'number'
                                },
                                following: {
                                    selector: '.js-profile-editable-area a[href*="tab=following"] span',
                                    type: 'number'
                                },
                                stars: {
                                    selector:
                                        '.js-responsive-underlinenav a[data-tab-item="stars"] span',
                                    type: 'number'
                                }
                            }
                        }
                    },
                })
            githubRes = githubData;
        }

        //spotifyData
        let spotifyRes
        if (spotifyURL === 'https://spotify.com') {
            console.log("spotify");
            const spotifyData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    audio: true
                })
            spotifyRes = spotifyData

        }

        // soundcloudData
        let soundcloudRes
        if (soundcloudURL === 'https://soundcloud.com') {
            console.log("soundcloud");
            const soundcloudData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    prerender: true,
                    audio: true,
                    data: {
                        plays: {
                            selector: '.sc-ministats-plays .sc-visuallyhidden',
                            type: 'number'
                        }
                    }
                })
            soundcloudRes = soundcloudData
        }

        // redditData
        let redditRes
        if (redditURL === 'https://reddit.com') {
            console.log("reddit");
            const redditData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        karma: {
                            selector: '#profile--id-card--highlight-tooltip--karma'
                        },
                        birthday: {
                            selector: '#profile--id-card--highlight-tooltip--cakeday'
                        },
                        avatar: {
                            selector: 'img[alt="User avatar"]',
                            attr: 'src',
                            type: 'url'
                        }
                    }
                })
            redditRes = redditData
        }

        // producthuntData
        let producthuntRes
        if (producthuntURL === 'https://producthunt.com') {
            console.log("producthunt");
            const producthuntData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        reviews: {
                            selector: 'div div div div div div a[href$="reviews"]'
                        }
                    }
                })
            producthuntRes = producthuntData
        }

        // imdbData
        let imdbRes
        if (imdbURL === 'https://imdb.com') {
            console.log("imdb");
            const imdbData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        director: {
                            selector: '.ipc-metadata-list__item:nth-child(1) a',
                            type: 'text'
                        },
                        writer: {
                            selector: '.ipc-metadata-list__item:nth-child(2) a',
                            type: 'text'
                        },
                        duration: {
                            selector: '.ipc-inline-list__item[role="presentation"]:nth-child(3)',
                            type: 'text'
                        },
                        year: {
                            selector:
                                '.ipc-inline-list__item[role="presentation"]:nth-child(1) span',
                            type: 'number'
                        },
                        rating: {
                            selector: '.rating-bar__base-button .ipc-button__text span',
                            type: 'text'
                        },
                        ratingCount: {
                            selector: '.rating-bar__base-button .ipc-button__text div:nth-child(3)',
                            type: 'text'
                        }
                    },
                })
            imdbRes = imdbData
        }

        // amazonData
        let amazonRes
        if (amazonURL === 'https://amazon.com') {
            console.log("amazon");
            const amazonData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        price: {
                            selector: '#attach-base-product-price',
                            attr: 'val',
                            type: 'number'
                        },
                        currency: {
                            selector: '#featurebullets_feature_div',
                            attr: 'val'
                        }
                    },
                });
            amazonRes = amazonData
        }

        // instagramData
        let instagramRes
        if (instagramURL === 'https://instagram.com') {
            console.log("instagram");
            const instagramData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        avatar: {
                            selector: 'meta[property="og:image"]',
                            attr: 'content',
                            type: 'image'
                        },
                        stats: {
                            selector: 'meta[property="og:description"]',
                            attr: 'content'
                        }
                    },
                });
            instagramRes = instagramData
        }

        //tiktokData
        let tiktokRes
        if (tiktokURL === 'https://tiktok.com') {
            console.log("tiktok");
            const tiktokData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        song: {
                            selector: 'h4[data-e2e="browse-music"]',
                            attr: 'text',
                            type: 'string'
                        },
                        likeCount: {
                            selector: 'strong[data-e2e="like-count"]',
                            attr: 'text',
                            type: 'string'
                        },
                        commentCount: {
                            selector: 'strong[data-e2e="comment-count"]',
                            attr: 'text',
                            type: 'string'
                        },
                        shareCount: {
                            selector: 'strong[data-e2e="share-count"]',
                            attr: 'text',
                            type: 'string'
                        }
                    },
                });
            tiktokRes = tiktokData
        }

        // youtubeData
        let youtubeRes
        if (youtubeURL === 'https://youtube.com') {
            console.log("youtube");
            const youtubeData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    prerender: true,
                    video: true,
                    audio: true,
                    data: {
                        views: {
                            selector: '.view-count',
                            type: 'number'
                        }
                    },
                });
            youtubeRes = youtubeData
        }

        // twitterData
        let twitterRes
        if (twitterURL === 'https://twitter.com') {
            console.log("twitter");
            const twitterData = await mql(urldata,
                {
                    apiKey: process.env.MICROLINK_API_KEY,
                    data: {
                        banner: {
                            selector: 'main a[href$="header_photo"] img',
                            attr: 'src',
                            type: 'image'
                        },
                        stats: {
                            selector: 'main',
                            attr: {
                                tweets: {
                                    selector: 'div > div > div > div h2 + div'
                                },
                                followings: {
                                    selector: 'a[href*="following"] span span'
                                },
                                followers: {
                                    selector: 'a[href*="followers"] span span'
                                }
                            }
                        },
                        latestTweets: {
                            selectorAll: 'main article',
                            attr: {
                                content: {
                                    selector: 'div[lang]',
                                    attr: 'text'
                                },
                                link: {
                                    selector: 'a',
                                    attr: 'href'
                                }
                            }
                        }
                    },
                    prerender: true,
                    waitForSelector: 'main article',
                });
            twitterRes = twitterData
        }

        // technologystackData
        const technologystackData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                meta: false,
                insights: {
                    lighthouse: false,
                    technologies: true
                }
            });
        console.log("technology");
        // fullscreenshotData
        const fullscreenshotData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                meta: false,
                screenshot: true,
                fullpage: true
            });

        // screenshotData
        const screenshotData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                meta: false,
                screenshot: true
            });
        console.log("screenshot");

        // healthcheckData
        const healtcheckInfo = async ({ query, page, response }) => ({
            url: response && response.url(),
            statusCode: response && response.status(),
            // headers: response && response.headers(),
            // html: await page.content()
        });
        const healthcheckData = await mql(urldata,
            {
                apiKey: process.env.MICROLINK_API_KEY,
                function: healtcheckInfo.toString(),
                meta: false
            });
        console.log("health");
        
        // embedData
        const embedData = await axios.get(`https://iframe.ly/api/oembed?url=${urldata}/&api_key=${process.env.IFRAMELY_API_KEY}&iframe=1&omit_script=1`);
        console.log("embed");

        // imageColorData
        // landing page color
        const colors = await getColors(screenshotData.data.screenshot.url)
        let col = [];
        for (let i = 0; i < colors.length; i++) {
            colors.forEach(color => {
                col.push(color.hex());
            });
        }

        // logo color
        let logoCol = [];
        if (data.logo.type === "ico") {
            logoCol = null;
        } else {
            const logoColor = await getColors(data.logo.url)
            console.log("data------------", data.logo.url);
            for (let i = 0; i < logoColor.length; i++) {
                logoColor.forEach(color => {
                    logoCol.push(color.hex());
                });
            }
        }
        console.log("logo");

        // digitalRank
        let digitalRes
        if(urldata.startsWith('https://www.')){
            const digitalRankData = await axios.get(`https://api.similarweb.com/v1/similar-rank/${urldata.slice(12)}/rank?api_key=${process.env.SIMILAR_RANK_API_KEY}`)
            digitalRes = digitalRankData
        }else if(urldata.startsWith('https://')){
            const digitalRankData = await axios.get(`https://api.similarweb.com/v1/similar-rank/${urldata.slice(8)}/rank?api_key=${process.env.SIMILAR_RANK_API_KEY}`)
            digitalRes = digitalRankData
        }else if(urldata.startsWith('www.')){
            const digitalRankData = await axios.get(`https://api.similarweb.com/v1/similar-rank/${urldata.slice(4)}/rank?api_key=${process.env.SIMILAR_RANK_API_KEY}`)
            digitalRes = digitalRankData
        }else {
            const digitalRankData = await axios.get(`https://api.similarweb.com/v1/similar-rank/${urldata}/rank?api_key=${process.env.SIMILAR_RANK_API_KEY}`)
            digitalRes = digitalRankData
        }
        console.log("result");

        // let promise1 = htmlData;
        // let promise2 = hrefs;
        // let promise3 = extractedText;

        // let [htmlResult, hrefResult, textResult] = await Promise.all([promise1, promise2, promise3]);

        // console.log(result1.data.html, "heloooooo");
        // console.log(result2);
        // console.log(result3);

        const result = {
            // microlinkData: data,

            core: coreData,
            logo: data.logo,
            Thumbnail: data.image,
            brand: imagecolorURL ? {
                logoColor: logoCol,
                landingPageColor: col
            } : null,
            html: htmlURL ? htmlData.data.html : null,
            iframe: embedURL ? embedData.data.html : null,
            link: linkURL ? hrefs : null,

            email: emailURL ? emailsArr : null,
            phonenumber: phonenumberURL ? phoneNumArr : null,

            sociallink: sociallinkURL ? sociallinkData.data.socialLinks : null,
            category: categoryURL ? categoryArr : null,
            text: textURL ? extractedText : null,
            screenshot: {
                fullscreenshot: fullscreenshotURL ? fullscreenshotData.data.screenshot : null,
                screenshot: screenshotURL ? screenshotData.data.screenshot : null,
            },
            healthcheck: healthcheckURL ? healthcheckData.data : null,
            technologystack: technologystackURL ? technologystackData.data.insights.technologies : null,
            additionalFields: {
                spotify: spotifyURL ? {
                    audio: spotifyRes.data.audio
                } : null,
                soundcloud: soundcloudURL ? {
                    audio: soundcloudRes.data.audio,
                    plays: soundcloudRes.data.plays
                } : null,
                reddit: redditURL ? {
                    avatar: redditRes.data.avatar,
                    birthday: redditRes.data.birthday,
                    avatar: redditRes.data.karma,
                } : null,
                producthunt: producthuntURL ? {
                    reviews: producthuntRes.data.reviews
                } : null,
                imdb: imdbURL ? {
                    director: imdbRes.data.director,
                    duration: imdbRes.data.duration,
                    rating: imdbRes.data.rating,
                    ratingCount: imdbRes.data.ratingCount,
                    writer: imdbRes.data.writer,
                    year: imdbRes.data.year,
                } : null,
                amazon: amazonURL ? {
                    currency: amazonRes.data.currency,
                    price: amazonRes.data.price,
                } : null,
                instagram: instagramURL ? {
                    avatar: instagramRes.data.avatar,
                    stats: instagramRes.data.stats,
                } : null,
                tiktok: tiktokURL ? {
                    commentCount: tiktokRes.data.commentCount,
                    likeCount: tiktokRes.data.likeCount,
                    shareCount: tiktokRes.data.shareCount,
                    song: tiktokRes.data.song,
                } : null,
                youtube: youtubeURL ? {
                    audio: youtubeRes.data.audio,
                    video: youtubeRes.data.video,
                    views: youtubeRes.data.views,
                } : null,
                github: githubURL ? {
                    followers: githubRes.data.stats.followers,
                    following: githubRes.data.stats.following,
                    stars: githubRes.data.stats.stars,
                } : null,
                twitter: twitterURL ? {
                    stats: twitterRes.data.stats
                } : null,

            },

            excerpts: excerptsURL ? excerptsData : null,
            digitalrank: digitalrankURL ? digitalRes.data.similar_rank : null,
            traffic: trafficURL ? traficData.data.workflow.data : null,
        }
        return result;

    },

});
