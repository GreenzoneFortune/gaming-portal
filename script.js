const games=["FireKrin","HighStake","Mafia","Game Vault","Panda Masters","Orion Stars","Juwa","Juwa 2","Milky Way Galaxy","Ultra Panda","VB Link","Cash Machine","Gaming Room"];
const grid=document.getElementById("gameGrid"),search=document.getElementById("gameSearch");
function render(list){grid.innerHTML=list.map((g,i)=>`<article class="game"><b>${g}</b><small>Gaming platform ${String(i+1).padStart(2,"0")}</small></article>`).join("")}
search.addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();render(games.filter(g=>g.toLowerCase().includes(q)))});render(games);

// ===== EDIT THESE DATES/TITLES FOR YOUR ACTUAL PROMOTIONS =====
const events={
 free:{title:"Next Free Play",date:"2026-10-01T20:00:00-05:00"},
 win:{title:"Next Largest Win Update",date:"2026-10-01T20:00:00-05:00"}
};
function setEvent(prefix,event){
 document.getElementById(prefix+"Title").textContent=event.title;
 document.getElementById(prefix+"Date").textContent=new Date(event.date).toLocaleString();
 const el=document.getElementById(prefix+"Countdown");
 function tick(){
  const diff=new Date(event.date)-new Date();
  if(diff<=0){el.textContent="NOW";return}
  const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
  el.textContent=`${String(d).padStart(2,"0")}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;
 }
 tick();setInterval(tick,1000);
}
setEvent("free",events.free);setEvent("win",events.win);
document.getElementById("year").textContent=new Date().getFullYear();

// ===== GOOGLE SHEETS / APPS SCRIPT =====
// Create a Google Apps Script Web App, then paste its /exec URL below.
// The static GitHub site cannot write directly to a private Google Sheet without
// an intermediary such as Apps Script.
const GOOGLE_SCRIPT_URL="PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE";

async function submitForm(form,statusId){
 const status=document.getElementById(statusId);
 const data=Object.fromEntries(new FormData(form).entries());
 status.textContent="Sending...";
 if(GOOGLE_SCRIPT_URL.startsWith("PASTE_")){
   status.textContent="Connect Google Apps Script first.";
   return;
 }
 try{
   await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({...data,timestamp:new Date().toISOString()})});
   status.textContent="Submitted. Thank you.";
   form.reset();
 }catch(e){status.textContent="Could not send. Please use WhatsApp, Telegram, or email."}
}
document.getElementById("playerForm").addEventListener("submit",e=>{e.preventDefault();submitForm(e.target,"formStatus")});
document.getElementById("complaintForm").addEventListener("submit",e=>{e.preventDefault();submitForm(e.target,"complaintStatus")});
