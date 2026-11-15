// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Vihaan Kaushik",
  title: "AI Engineer · Speech AI · Generative AI",
  email: "workvihu@gmail.com",
  resume: "Vihaan_Kaushik_Resume.pdf",
  links: {
    GitHub: "https://github.com/vihaan-kaushik",
    LinkedIn: "https://www.linkedin.com/in/vihaan-kaushik-b204ab297/",
    LeetCode: "https://leetcode.com/u/vihaan_kaushik/",
    CodeChef: "https://www.codechef.com/users/brave_art_30",
  },
};

export const education = [
  { degree: "B.Tech, Information Technology", year: "2023 – 2027", detail: "ABES Engineering College (AKTU) · CGPA 7.69" },
  { degree: "Class XII · CBSE", year: "2022", detail: "St. Mary's Academy, Saharanpur · 80.8%" },
  { degree: "Class X · ICSE", year: "2020", detail: "Infant Jesus School, Saharanpur · 86.34%" },
];

export const skills = [
  { title: "Tongues", items: ["Python", "Java", "C"] },
  { title: "Machine Learning", items: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Hugging Face", "Model Training"] },
  { title: "Generative AI", items: ["Prompt Engineering", "LLM Applications", "RAG Pipelines", "Speech AI (ASR, TTS)"] },
  { title: "Cloud & Tools", items: ["AWS", "Docker", "Git", "GitHub", "Jupyter", "Google Colab"] },
  { title: "Foundations", items: ["Data Structures & Algorithms", "OOP", "DBMS"] },
];

export const ratings = [
  { site: "LeetCode", rating: 1707, url: profile.links.LeetCode },
  { site: "CodeChef", rating: 1611, url: profile.links.CodeChef },
];

export const experience = [
  {
    when: "Jun 2026 — Present",
    role: "AI Intern · ZEE Entertainment Enterprises",
    points: [
      "Developed and open-sourced an end-to-end AI dubbing pipeline that requires only the target language — VoxLingua for language detection, VibeVoice for speaker diarization & multilingual transcription, and Indic Conformer for Indic-language transcription.",
      "Integrated TranslateGemma 4B for translation and Tarang, ZEE's in-house TTS engine, for target-language speech — a fully automated multilingual dubbing workflow.",
    ],
    cert: "https://drive.google.com/file/d/11ildBRMRv7Iv5-xYyRXYtUCwt1dmuWGe/view?usp=sharing",
  },
  {
    when: "Jan 2026 — Feb 2026",
    role: "Experiential Learning · UP Police (MY Bharat)",
    points: [
      "Executed cybersecurity, secure data handling and administrative workflow simulations during a 120-hour tactical learning programme.",
    ],
    cert: "https://drive.google.com/file/d/1lF2NHdK9sOK8k8UgVayTBR7Fdtiwwtt5/view?usp=sharing",
  },
  {
    when: "Apr 2025 — May 2025",
    role: "AI & Machine Learning Intern · Acmegrade",
    points: [
      "Engineered a movie recommender over 50,000+ films using TF-IDF, Truncated SVD and cosine similarity.",
      "Enhanced relevance through advanced content-based filtering, driving higher simulated user engagement.",
    ],
    cert: "https://drive.google.com/file/d/1R2rzHKaU-1WGSyB_zA1b-aDe9B5WgEQJ/view?usp=sharing",
  },
];

export const projects = [
  {
    name: "AI Technical Interviewer",
    sub: "Offline voice-based interviewing system",
    desc: "An offline interviewer powered by Llama 3.2 via Ollama — plans role-specific interviews from a 36-question bank, asks adaptive follow-ups on missing rubric points, and scores answers on cited evidence, all by voice.",
    stats: [["6.3%", "WER"], ["<0.5s", "transcripts"], ["3", "ASR models benchmarked"]],
    tags: ["Llama 3.2", "Ollama", "Parakeet ASR", "TTS"],
    url: "https://github.com/vihaan-kaushik/Interviewing-System",
  },
  {
    name: "AI Document Reader",
    sub: "RAG-based document understanding",
    desc: "A retrieval-augmented architecture on LangChain and FastAPI that automates analysis of 50+ page documents, answering questions grounded in the source text.",
    stats: [["+90%", "retrieval accuracy"], ["5×", "faster responses"]],
    tags: ["LangChain", "FastAPI", "RAG", "LLMs"],
    url: "https://github.com/vihaan-kaushik/AI-Document-Reader-with-UI",
  },
  {
    name: "Meghdoot",
    sub: "AI-powered smart irrigation",
    desc: "An ESP32-based IoT irrigation system guided by a SARIMA forecasting model that predicts rainfall and waters only when the soil truly thirsts.",
    stats: [["85%", "forecast accuracy"], ["−50%", "water"], ["+25%", "yield"]],
    tags: ["ESP32", "IoT", "SARIMA", "Patented"],
  },
];

export const patent = {
  date: "Feb 2026",
  title: "Smart Irrigation and Rainwater Management System",
  desc: "an automated, AI-driven IoT system automating 100% of soil-moisture management and rainfall-prediction cycles.",
};

export const honours = [
  {
    title: "Smart India Hackathon",
    desc: "Top 3 — Internal round, 2025.",
    cert: "https://drive.google.com/file/d/16bvBz7_YgFV70uBpn6crGtrT6AP3rkTo/view?usp=sharing",
  },
  { title: "Vice Chair · IEEE Student Branch", desc: "Directed technical initiatives and large-scale event operations for 80+ members." },
  { title: "General Secretary · Agora Debating Society", desc: "Orchestrated competitive events and drove active member participation." },
];
