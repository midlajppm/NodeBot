Bot.hears('🔴Joined🔴', async ctx => {
    const chat_id = -1001321491375;
    const keyboard2 = new Keyboard()
  .text("💰Balance").row()
  .text("👥 Referral")
.text("🎰 Bonus")
.text("📤 Withdraw").row()
.text("💼 Set Wallet");
    const { status } = await ctx.api.getChatMember(chat_id, ctx.from.id);
    let isMember = status === 'member'  status == 'administrator' status==='creator';
    if(isMember){
    ctx.reply("<b>Here's Your Main Menu Sir</b>", {
  parse_mode: "HTML",
    reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard2.build(),
    },
});
const bod = await Storage.get('log'+ctx.from.id)
   if(!bod){
const refer = await Storage.get('ref'+ctx.from.id)
await Balance("balance"+refer).incr(1);
await Balance("refers"+refer).incr(1);
await Storage.set('log'+ctx.from.id, 'done')
}
 }else{
    ctx.reply("You Are Not A Member");
    }
})
