
const API_BASE="/api";
async function famApi(path){
 try{let r=await fetch(API_BASE+path); return await r.json();}
 catch(e){return {error:e.message};}
}
async function lookupPlayer(){
 const id=document.getElementById("playerId").value.trim();
 const box=document.getElementById("playerResult");
 if(!id)return;
 const j=await famApi("/player-info?playerId="+encodeURIComponent(id));
 box.innerHTML=j.data ? `<h2>${j.data.name}</h2><p>Kingdom: ${j.data.kingdom}</p><p>Level: ${j.data.level}</p><img style="max-width:90px" src="${j.data.profilePhoto||''}">` : `<p>${j.message||"Player not found"}</p>`;
}
async function loadIntelligence(){
 if(document.getElementById("kingdomResult")){
 let j=await famApi("/kingdom-tracker?kingdomId=1245");
 let s=j.data?.servers?.[0];
 document.getElementById("kingdomResult").innerHTML=s?`<h2>Kingdom ${s.kingdomId}</h2><p>Opened: ${s.openTime}</p><p>Verified: ${s.isVerified?"Yes":"No"}</p>`:"No data";
 }
 if(document.getElementById("giftResult")){
 let j=await famApi("/gift-codes");
 let codes=j.data?.giftCodes||[];
 document.getElementById("giftResult").innerHTML=codes.map(x=>`<div class="calc-card"><b>${x.code}</b><br>${x.expiresAt||"No expiration"}</div>`).join("")||"No codes";
 }
 if(document.getElementById("kvkResult")){
 let j=await famApi("/kvk/matches?limit=10");
 document.getElementById("kvkResult").innerHTML=(j.data||[]).map(x=>`<div><b>${x.kvk_title||"KVK"}</b> ${x.kingdom_a} vs ${x.kingdom_b} - Winner ${x.castle_winner}</div>`).join("")||"No KVK data";
 }
}
loadIntelligence();
