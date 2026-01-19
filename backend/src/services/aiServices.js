// // import Groq from "groq-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// import Groq from "groq-sdk";

// console.log("ENV KEY:", process.env.GROQ_API_KEY ? "FOUND" : "MISSING");

// const client = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });


// // const client = new Groq({
// //   apiKey: process.env.GROQ_API_KEY
// // });

// export async function getMatchScore(student, job){

//   const studentSkills = student?.skills?.length
//     ? student.skills.join(", ")
//     : "No skills provided";

//   const jobSkills = job?.skillsRequired?.length
//     ? job.skillsRequired.join(", ")
//     : "No skills listed";

//   const jobTitle = job?.title || "No Title";
//   const jobDesc = job?.description || "No Description";
//   const summary = student?.profileSummary || "No summary";

//   const prompt = `
// Return ONLY valid JSON:

// {
//  "score": 0-100,
//  "reasons": ["",""]
// }

// Candidate:
// Skills: ${studentSkills}
// Summary: ${summary}

// Job:
// Title: ${jobTitle}
// Skills: ${jobSkills}
// Description: ${jobDesc}
// `;

//   const response = await client.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       { role: "system", content: "Return only strict JSON." },
//       { role: "user", content: prompt }
//     ],
//     temperature: 0.2
//   });

//   let text = response.choices[0].message.content.trim();

// console.log("AI Raw Output:", text);

// // Remove markdown ```json fences if present
// if (text.startsWith("```")) {
//   text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
// }

// let result;

// try {
//   result = JSON.parse(text);
// } catch (err) {
//   console.log("Failed to parse JSON. Raw text:", text);
//   throw new Error("AI did not return valid JSON");
// }

// return result;

// }

import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function getMatchScore(student, job){

  const prompt = `
Return ONLY valid JSON like this:
{
 "score": 0-100,
 "reasons": ["",""]
}

Candidate Skills: ${student?.skills?.join(", ") || "None"}
Summary: ${student?.profileSummary || "None"}

Job Title: ${job?.title}
Job Skills: ${job?.skillsRequired?.join(", ")}
Description: ${job?.description}
`;

  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages:[
      {role:"system",content:"Return only JSON"},
      {role:"user",content:prompt}
    ],
    temperature:0.2
  });

  let text = res.choices[0].message.content.trim();

  if(text.startsWith("```")) text = text.replace(/```json|```/g,"").trim();

  return JSON.parse(text);
}

// Cover Letter
export async function getCoverLetter(student, job){

  const prompt = `
Write a professional cover letter for this candidate applying for this job.
Use 3-5 short paragraphs.

Candidate:
${student.profileSummary}
Skills: ${student.skills?.join(", ")}

Job:
${job.title}
${job.description}
`;

  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages:[
      {role:"user",content:prompt}
    ]
  });

  return res.choices[0].message.content;
}

