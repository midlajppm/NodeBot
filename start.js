const Telegraf = require('telegraf');
const bot = new Telegraf('5294208119:AAGkauZmQxilZQJf-UFiW4Eafzl6BsBCI-I');

Bot.command('start', async ctx => {
var params = ctx.message.text.split(" ")[1]
const keyboard = new Keyboard()
  .text("🔴Joined🔴");
  var welcome = "<b>Hey! <a href='tg://user?id="+ctx.from.id+"'>"+ctx.from.first_name+"</a>,\n\n⚠️Subscribe Our Channels to Use This Bot.\n\n➤@BotMateCoding\n\n☑️Done Subscribed! Click On Joined</b>"
    if(params == ctx.from.id){
  ctx.reply(welcome, {
  parse_mode: "HTML",
    reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.build(),
    },
 });

}
if(params){
ctx.reply(welcome, {
  parse_mode: "HTML",
    reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.build(),
    },
 });
 await Storage.set('ref'+ctx.from.id, params)

}
if(!params){
ctx.reply(welcome, {
  parse_mode: "HTML",
    reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.build(),
    },
 });
 }
});
Bot.hears('💰Balance', async ctx => {
    const balance = await Balance("balance"+ctx.from.id).get();
    const wallet = await Storage.get('wallet'+ctx.from.id)
    ctx.reply("👮‍♀ User : "+ctx.from.first_name+"\n\n⚙ Wallet : "+wallet+"\n\n💸 Points Balance : "+balance+" Points");
});
Bot.hears('👥 Referral', async ctx => {
const refers = await Balance("refers"+ctx.from.id).get();
    const refLink = "https://t.me/BotMateReferAndEarnBot?start="+ctx.from.id
    ctx.reply("Total User: "+refers+"\n\nYour Ref Link: "+refLink+"");
});
Bot.hears('🎰 Bonus', async ctx => {
const last_run_at = await Storage.get('lastRun'+ctx.from.id)
function canRun(){
if(!last_run_at){ return true }
var minutes = (Date.now() - last_run_at) /1000/60;
var minutes_in_day = 24 * 60
var next = minutes_in_day - minutes
var wait_hours = Math.floor(next / 60)
next -= wait_hours * 60
var wait_minutes = Math.floor(next)
var seconds = Math.floor((next - wait_minutes) * 60)
if (minutes < minutes_in_day) {
ctx.reply("Already Claimed Try Again Later");
return
}
return true;
}

if(!canRun()){ return }
await Storage.set('lastRun'+ctx.from.id, Date.now())
await Balance('balance'+ctx.from.id).incr(2);
ctx.reply("🎁 Congrats , you Received 2 Points")
//coded by @HyperGamingR
});
Bot.hears('📤 Withdraw', async ctx => {
const wallet = await Storage.get('wallet'+ctx.from.id)
if(!wallet){
ctx.reply("You Need To Set Your wallet First")
return}
const balance = await Balance("balance"+ctx.from.id).get();
if(balance < 10){
ctx.reply("You Need To Have A Balance Greater Than 10")
return}
ctx.reply("📤 Enter Amount of Points")
ctx.question('withdraw')
})
Bot.on('answer', 'withdraw', async ctx => {
const balance = await Balance("balance"+ctx.from.id).get();
const wallet = await Storage.get('wallet'+ctx.from.id)
if (ctx.message.text < 10) {
    ctx.reply("❌ Minimum Withdraw 10 Points")
return}
if (ctx.message.text > balance) {
ctx.reply("❌ Maximum Withdraw " + balance + " Points")
return}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
var amount = ctx.message.text
if (isNumeric(amount)) {
var cut = parseInt(amount)
ctx.reply("✅ Withdrawal Requested Successfully\n\n💳 Transaction Details = \n 💰Amount = " +amount +" Points\n💼 Wallet = " +wallet +"\n\n⏰Wait 1-12 Hour We Will Check And Pay You🎧 \n\n✅ Important❗️\nIf You Do Fake Refer You Will Banned\n\n🌹 Payment Channel : @BotMateCoding")
await Balance("balance"+ctx.from.id).decr(cut);
const text = "🔋 New Withdraw Requested 🏦\n\n▪️ Status = Pending\n▪️ User = " +ctx.from.first_name+"\n▪️ User ID = " +ctx.from.id +"\n▪️ Amount = " + amount +" Points\n▪️ User Referrals = 0\n\n💳 Address =\n " +wallet +"\n\n👮🏻‍♂️ Bot = @" +ctx.me.username +""
var logs = "@BotMateCoding"
  ctx.api.sendMessage(logs, text)
return
}
});
Bot.hears("💼 Set Wallet", async ctx => { 
ctx.reply("Send your wallet name");
  ctx.question('wallet')
  })
Bot.on('answer', 'wallet', async ctx => {
await Storage.set('wallet'+ctx.from.id, ctx.message.text)
  ctx.reply("Your Wallet Set to " + ctx.message.text);
});
