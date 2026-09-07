import { courses } from './content';
export const dimensions = [
 {name:'Persuasive Structure',slug:'persuasive-structure',title:'The point is there. The argument needs a shape.',description:'You can explain the detail, but the listener may have to find the decision for themselves. Your most useful next practice is selecting the point, the evidence and the ask.',exercise:'Take a recent update. Rewrite its opening as “I recommend … because … The next step is …”. Say it in 45 seconds, then ask a listener to repeat the decision.',course:2,guide:'make-your-work-visible'},
 {name:'Pressure Performance',slug:'pressure-performance',title:'Your communication is clear. Until the stakes rise.',description:'Your answers suggest that interruptions, unexpected questions or time pressure can make your delivery less clear. Practise recovering your train of thought while the conversation keeps moving.',exercise:'Deliver a 30-second recommendation. Ask someone to interrupt once. Pause, acknowledge the question, then return to your main point without restarting the whole explanation.',course:0,guide:'stay-clear-under-pressure'},
 {name:'Register Control',slug:'register-control',title:'The message is right. The setting changes its effect.',description:'Your answers suggest that choosing the right level of directness, formality and detail takes effort. Practise keeping the meaning while changing the way it lands.',exercise:'Make the same request to a close colleague, a new client and a senior decision-maker. Keep the action unchanged. Adjust your context, directness and closing sentence.',course:3,guide:'register-without-the-jargon'}
];
export const questions = [
 {q:'Someone challenges your proposal in front of the group. What is hardest?',a:['Choosing the one piece of evidence that supports my point.','Keeping my train of thought after the interruption.','Disagreeing firmly without sounding defensive.']},
 {q:'You have one minute to explain a recommendation. Where does it go wrong?',a:['I spend too long on background before reaching the decision.','The time limit makes me rush or lose words.','I cannot judge how direct to be with this audience.']},
 {q:'A client says, “That sounds expensive.” Which response takes most effort?',a:['Connecting the price to a specific, relevant value.','Staying composed enough to ask a useful question.','Questioning their concern without sounding confrontational.']},
 {q:'You need to push back on an unrealistic deadline. What do you find difficult?',a:['Organising the constraint, trade-off and alternative clearly.','Saying my prepared point when the other person pushes back.','Making the boundary clear without damaging the relationship.']},
 {q:'After a detailed explanation, someone says “So what do you need from us?” What feels familiar?',a:['I gave the information but forgot to make a clear ask.','I knew the ask, but lost it when everyone was looking at me.','I softened the ask so much that it sounded optional.']},
 {q:'You are asked an unexpected follow-up question. What would you most like to improve?',a:['Selecting a relevant example instead of talking around it.','Pausing and answering without freezing or filling the silence.','Matching my level of detail and tone to the questioner.']},
 {q:'Which upcoming situation would make practice most useful?',a:['An interview where I need to explain my own contribution.','A meeting, pitch or client conversation where I need a decision.','A difficult leadership conversation or high-stakes negotiation.']}
];
export function scoreDiagnostic(answers:number[]){
 const scores=[0,0,0];answers.slice(0,6).forEach(x=>{if(x>=0&&x<3)scores[x]++});
 const max=Math.max(...scores);const tied=scores.flatMap((x,i)=>x===max?[i]:[]);
 // A tie is resolved by the most recent scenario answer among tied dimensions.
 const dominant=[...answers.slice(0,6)].reverse().find(x=>tied.includes(x))??0;
 const courseIndex=answers[6]===0?1:dimensions[dominant].course;
 return {scores,dominant,tied:tied.length>1,courseIndex,course:courses[courseIndex],dimension:dimensions[dominant]};
}
