const message = {
  username: "ツール配信bot",
  content: "<@&440817146885570560>新しいバージョンのリリースのお知らせです😎\rご意見・ご要望は #ツール・スクリプト関連チャンネル にお願いします",
  embeds: [
    {
      title:process.env.NAME,
      description:process.env.BODY,
      color:51711
    }
  ]
};
console.log(JSON.stringify(message));