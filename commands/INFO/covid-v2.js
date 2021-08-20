const Discord = require("discord.js")
const axios = require('axios');
const csv = require('csvtojson');
let link = "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_day"

/**
 * Shared by Moka
 */
module.exports = {
    name: "covid-v2",
    description: "Covid API ở Việt Nam",
    delay: 10,
    vote: true,

    execute(client, message, args) {
        axios.get(link).then(function (response) {
            csv({ noheader: false })
                .fromString(response.data)
                .then((jsonObj) => {
                    let nowtime = new Date() 
                    let day = jsonObj.find(({ day_full }) => day_full === nowtime.getFullYear() + "/" + (nowtime.getMonth() + 1) + "/" + nowtime.getDate())
                    console.log(day)
                    let messages = `**Cập nhật vào lúc ${nowtime.getHours()} giờ ${nowtime.getMinutes()} phút Ngày ${nowtime.getDate()} Tháng ${(nowtime.getMonth() + 1)} Năm ${nowtime.getFullYear()}**\nViệt Nam ghi nhận tổng cộng **${day["CỘNG ĐỒNG"]}** ca mắc mới tại **${day.city_by_day}** tỉnh thành.\nTrong đó có **${day.community}** được phát hiện ngoài cộng động, **${day.blockade}** được phát hiện trong khu cách ly.\nNhư vậy, tính từ ngày 27/4 cho tới nay, Việt Nam ghi nhận tổng cộng **${day["TỔNG CỘNG ĐỒNG"]}** ca mắc COVID-19. `
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor('Số liệu được lấy từ báo điện tử VNExpress', 'https://cdnmedia.baotintuc.vn/Upload/OND64xLJqhpDJlQ2Gd1dpw/files/2021/01/thong-diep-5k-5121a.jpg', 'https://vnexpress.net/covid-19/covid-19-viet-nam')
                    .setTitle('Thông tin về số ca nhiễm Covid-19 của nước ta')
                    .setDescription(`Số liệu được cập nhật vào lúc ${nowtime.getHours()} giờ ${nowtime.getMinutes()} phút Ngày ${nowtime.getDate()} Tháng ${(nowtime.getMonth() + 1)} Năm ${nowtime.getFullYear()}`)
                    .setThumbnail('https://cdnmedia.baotintuc.vn/Upload/OND64xLJqhpDJlQ2Gd1dpw/files/2021/01/thong-diep-5k-5121a.jpg')
                    .setFooter("Code bởi Moka Sakura#5864")
                    .addFields(
                        {
                            name: 'Tổng số ca nhiễm (từ 27/4)',
                            value: `${Intl.NumberFormat().format(day["TỔNG CỘNG ĐỒNG"])}(+${Intl.NumberFormat().format(day["CỘNG ĐỒNG"])})`,
                            inline: true
                        },
                        {
                            name: 'Tổng số tử vong',
                            value: `${Intl.NumberFormat().format(day.total_deaths)}(+${day.new_deaths})`,
                            inline: true
                        },
                        {
                            name: 'Tổng số ca bình phục',
                            value: `${Intl.NumberFormat().format(day.total_recovered_12)}(+${day.new_recovered})`,
                            inline: true
                        },
                        {
                            name: 'Tổng số ca đang được điều tra dịch tễ trong ngày',
                            value: `${Intl.NumberFormat().format(day.community)}`,
                            inline: true
                        },
                        {
                            name: 'Tổng số ca được phát hiện trong khu cách ly trong ngày',
                            value: `${Intl.NumberFormat().format(day.blockade)}`,
                            inline: true
                        },
                        {
                            name: 'Như vậy trong 7 ngày qua',
                            value:`Cả nước ghi nhận thêm/giảm)  ${Intl.NumberFormat().format(day["diff_mt7_local_cases (35)"])} ca (${day.per_mt7_local_cases})\nSố ca tử vong (tăng/ giảm) ${day.diff_mt7_deaths} ca (${day.per_mt7_deaths})\n Số người khỏi bệnh (tăng/giảm) ${day.diff_mt7_recovered} ca (${day.per_mt7_recovered})`
                        }
                    )

                    message.lineReplyNoMention(exampleEmbed).then(msg => msg.delete({timeout: 120000}));
                })
        }).catch(function (error) {
            console.log(error);
        })
    }
}