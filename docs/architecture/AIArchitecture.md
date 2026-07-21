# AI

<!-- TODO: Implementation details go here -->
# AI Architecture

# HireMind AI

Version: 1.0

Status: Draft

Owner: AI Engineering Team

---

# Table of Contents

1. Purpose

2. AI Philosophy

3. AI Goals

4. AI Non Goals

5. AI Technology Stack

6. AI System Overview

7. AI Modules

8. AI Request Lifecycle

9. AI Design Principles

---

# 1. Purpose

This document defines the Artificial Intelligence architecture of HireMind AI.

It describes how AI capabilities are designed, implemented, and integrated throughout the platform.

This document covers:

- Resume Intelligence
- ATS Scoring
- Semantic Search
- Candidate Matching
- GitHub Intelligence
- AI Recruiter Copilot
- Explainable AI
- Prompt Engineering
- Retrieval-Augmented Generation (RAG)

This document intentionally focuses on architecture rather than model training.

---

# 2. AI Philosophy

Artificial Intelligence should assist recruiters—not replace them.

Every AI-generated recommendation must be:

- Explainable
- Reproducible
- Organization-aware
- Human-reviewable

The platform avoids opaque "black-box" decisions.

Instead, AI provides structured reasoning that helps recruiters make informed hiring decisions.

Example

Instead of

"Candidate Score = 91"

The system should provide

Overall Match: 91%

Reasons

- Strong FastAPI experience
- Relevant backend projects
- 3 years of Python experience
- Missing Docker knowledge

This philosophy increases transparency and recruiter trust.

---

# 3. AI Goals

The AI subsystem is designed to achieve the following objectives.

### Goal 1

Reduce manual resume screening.

Automatically extract structured information from resumes.

---

### Goal 2

Improve candidate-job matching.

Recommend candidates using semantic similarity rather than simple keyword matching.

---

### Goal 3

Provide actionable ATS feedback.

Generate practical recommendations to improve resume quality.

---

### Goal 4

Support recruiter decision-making.

Generate summaries, comparisons, and recommendations using organizational data.

---

### Goal 5

Minimize operational cost.

Use lightweight embedding models and invoke large language models only when generation is required.

---

### Goal 6

Keep AI modular.

Each AI capability should be independently replaceable without impacting the rest of the system.

---

# 4. AI Non Goals

The initial version of HireMind AI will NOT include:

- Fine-tuning custom language models
- Reinforcement learning
- Autonomous hiring decisions
- AI-generated offer letters
- Automatic candidate rejection
- Multi-agent orchestration
- Voice cloning
- On-device inference

These features may be explored in future versions.

---

# 5. AI Technology Stack

Embedding Model

Sentence Transformers

Recommended Model

all-MiniLM-L6-v2

Purpose

Semantic similarity

Candidate matching

Vector search

---

Language Model

Hugging Face Inference API

Purpose

Resume summaries

ATS recommendations

Recruiter Copilot

Interview question generation

Email drafting

---

Vector Store

pgvector

Provider

Supabase PostgreSQL

Purpose

Semantic search

Resume retrieval

Job retrieval

Context retrieval

---

Backend

FastAPI

Purpose

AI orchestration

Prompt construction

Model invocation

Response validation

---

Storage

Supabase Storage

Purpose

Resume files

Supporting documents

---

# 6. AI System Overview

The AI subsystem is organized into independent modules.

Resume Intelligence

↓

ATS Intelligence

↓

Semantic Search

↓

Job Matching

↓

GitHub Intelligence

↓

Recruiter Copilot

↓

Analytics Intelligence

Each module performs one well-defined responsibility.

Modules communicate through service interfaces rather than directly invoking one another.

---

# 7. AI Modules

The AI subsystem contains the following modules.

Resume Intelligence

Responsible for parsing and structuring resumes.

---

ATS Intelligence

Evaluates resume quality.

Generates ATS scores and recommendations.

---

Semantic Search

Creates embeddings.

Performs vector similarity search.

---

Matching Engine

Ranks candidates against job descriptions.

Ranks jobs against candidate resumes.

---

GitHub Intelligence

Analyzes GitHub repositories and developer profiles.

---

Recruiter Copilot

Provides conversational assistance using Retrieval-Augmented Generation.

---

Interview Intelligence

Generates interview questions based on the candidate profile and job description.

---

Analytics Intelligence

Produces AI-generated summaries and hiring insights.

---

# 8. AI Request Lifecycle

Every AI request follows the same architecture.

Client Request

↓

FastAPI Endpoint

↓

Authentication

↓

Authorization

↓

Business Service

↓

AI Service

↓

Prompt Builder

↓

Model Invocation

↓

Response Validation

↓

Business Formatting

↓

API Response

The AI layer never communicates directly with the frontend.

All AI requests pass through the backend service layer.

---

# 9. AI Design Principles

The AI architecture follows these engineering principles.

### Modular

Each AI capability is implemented as an independent service.

---

### Explainable

Every recommendation includes supporting evidence.

---

### Deterministic When Possible

Tasks such as parsing, scoring, and matching use deterministic algorithms wherever feasible.

Language models are reserved for tasks requiring natural language generation.

---

### Retrieval Before Generation

The system retrieves relevant organizational data before invoking a language model.

This reduces hallucinations and improves accuracy.

---

### Human in the Loop

Recruiters remain responsible for all hiring decisions.

AI recommendations are advisory.

---

### Cost Efficient

Embedding models are preferred over large language models whenever possible.

Large language models are invoked only for tasks that require generation.

---

### Provider Agnostic

The AI architecture depends on internal service interfaces rather than directly coupling business logic to a specific AI provider.

This enables future migration to other providers if necessary.

---
---

# 10. Resume Intelligence Architecture

Resume Intelligence is the first AI subsystem executed after a candidate uploads a resume.

Its responsibility is to transform an unstructured resume into validated, structured data that can be used by all downstream services.

The output of this module becomes the foundation for:

- ATS Intelligence
- Candidate Matching
- Recruiter Copilot
- Analytics
- Candidate Search
- Recommendation Engine

---

# 11. Resume Processing Pipeline

Every uploaded resume follows the same processing lifecycle.

Candidate Upload

↓

File Validation

↓

File Storage (Supabase Storage)

↓

Text Extraction

↓

Text Cleaning

↓

Section Detection

↓

Structured Parsing

↓

AI Enhancement

↓

Schema Validation

↓

Embedding Generation

↓

Persist Results

↓

Resume Ready

Each stage has a single responsibility and can fail independently without corrupting the stored resume.

---

# 12. File Validation

Supported Formats

- PDF
- DOCX

Maximum Size

10 MB

Validation Checks

- Supported MIME type
- File extension
- Maximum size
- Empty file detection
- Corrupted document detection

Invalid files are rejected before entering the AI pipeline.

---

# 13. Resume Storage

The original resume is preserved without modification.

Storage Location

Supabase Storage

Metadata Stored

- Resume ID
- Candidate ID
- File Name
- File Type
- File Size
- Storage Path
- Upload Timestamp
- Resume Version

The original file serves as the source of truth for future reprocessing.

---

# 14. Text Extraction

Purpose

Convert uploaded documents into plain text while preserving as much semantic structure as possible.

Supported Extractors

PDF

- PyMuPDF (Primary)
- pdfplumber (Fallback)

DOCX

- python-docx

Expected Output

Raw text containing all readable content from the document.

The extraction stage should never attempt to interpret or summarize the content.

---

# 15. Text Cleaning & Normalization

Raw extracted text often contains formatting artifacts.

The cleaning stage normalizes content before parsing.

Normalization Steps

- Remove duplicate whitespace
- Normalize line endings
- Remove invisible characters
- Standardize bullet points
- Normalize punctuation
- Preserve meaningful section spacing
- Remove repeated headers and footers where detected

The objective is to improve parser consistency while preserving information.

---

# 16. Resume Section Detection

The cleaned text is divided into logical resume sections.

Typical Sections

- Contact Information
- Professional Summary
- Skills
- Experience
- Education
- Projects
- Certifications
- Achievements
- Publications
- Languages

Detection Strategy

Primary

Rule-based heading detection.

Fallback

AI-assisted classification when headings are ambiguous.

Section detection is deterministic whenever possible.

---

# 17. Structured Resume Parsing

Each detected section is parsed into structured objects.

Contact Information

Extract

- Full Name
- Email
- Phone
- Location
- LinkedIn
- GitHub
- Portfolio

---

Skills

Extract

- Technical Skills
- Programming Languages
- Frameworks
- Databases
- Cloud Platforms
- Developer Tools
- Soft Skills

Skills are normalized into canonical names to reduce duplication.

Example

"C++"

and

"CPP"

map to

"C++"

---

Education

Extract

- Institution
- Degree
- Specialization
- Start Year
- End Year
- Grade
- CGPA
- Percentage

---

Experience

Extract

- Company
- Position
- Employment Type
- Start Date
- End Date
- Duration
- Responsibilities
- Technologies Used

---

Projects

Extract

- Project Name
- Description
- Technologies
- GitHub URL
- Live URL
- Key Contributions

---

Certifications

Extract

- Certification Name
- Issuing Organization
- Issue Date
- Expiration Date (if available)

---

Achievements

Extract

- Title
- Description
- Date

The parser produces structured data only.

No scoring or ranking occurs at this stage.

---

# 18. AI Enhancement Layer

After deterministic parsing, AI enriches the extracted information.

Enhancement Tasks

Resume Summary

Generate a concise professional summary based on the parsed profile.

Skill Categorization

Group extracted skills into meaningful categories.

Project Understanding

Generate concise summaries for each project.

Experience Insights

Highlight measurable accomplishments when possible.

Technology Detection

Infer commonly used technologies from descriptions when explicitly supported by context.

The enhancement layer must never overwrite deterministic fields without validation.

---

# 19. Resume Schema Validation

All parsed output is validated against a predefined schema before persistence.

Validation Checks

- Required fields
- Data types
- Date formats
- URL formats
- Duplicate detection
- Empty collections
- Invalid values

Invalid records trigger retry or fallback mechanisms rather than being stored.

---

# 20. Embedding Generation

After successful parsing, semantic embeddings are generated.

Embedding Source

Combined structured resume representation.

Included Information

- Summary
- Skills
- Experience
- Projects
- Education

Embedding Model

Sentence Transformers

Recommended Model

all-MiniLM-L6-v2

The generated vector is stored in pgvector for semantic retrieval.

Only one active embedding is maintained for the latest resume version.

---

# 21. Resume Versioning

Candidates may upload updated resumes over time.

Each upload creates a new resume version.

Version History

Resume V1

↓

Resume V2

↓

Resume V3

↓

Latest

Previous versions remain available for auditing and historical comparisons.

Only the latest processed version is used for matching and ATS evaluation.

---

# 22. Error Handling & Recovery

The resume pipeline is designed to tolerate partial failures.

Examples

Text Extraction Failure

Resume status → Failed

Reason recorded.

Candidate may re-upload.

---

AI Enhancement Failure

Resume parsing succeeds.

Enhancement fields remain empty.

Resume is still usable.

---

Embedding Failure

Structured data is stored.

Embedding generation is retried asynchronously.

---

Schema Validation Failure

Resume is not marked as processed.

Detailed validation errors are logged for debugging.

The pipeline favors graceful degradation over complete failure.

---

# 23. Resume Intelligence Design Principles

The Resume Intelligence subsystem follows these principles:

- Preserve the original uploaded document.
- Separate deterministic parsing from AI enhancement.
- Validate all structured output before storage.
- Use AI to enrich, not replace, deterministic extraction.
- Generate embeddings only after successful validation.
- Maintain immutable resume versions.
- Ensure every downstream AI module consumes a consistent schema.

This layered approach improves reliability, explainability, and maintainability while reducing AI cost and minimizing parsing errors.

---
---

# 24. ATS Intelligence Architecture

ATS Intelligence evaluates the quality and relevance of a candidate's resume.

Unlike Resume Intelligence, which extracts structured information, ATS Intelligence evaluates that information against hiring best practices and job requirements.

Its responsibilities include:

- Resume quality assessment
- ATS compatibility evaluation
- Job-specific keyword matching
- Gap analysis
- Recommendation generation
- Explainable scoring

ATS Intelligence never modifies the original resume.

---

# 25. ATS Processing Pipeline

The ATS evaluation pipeline executes after Resume Intelligence successfully completes.

Canonical Resume Profile

↓

Job Context (Optional)

↓

Resume Evaluation

↓

Category Scoring

↓

Gap Analysis

↓

Recommendation Generation

↓

Final ATS Report

↓

Persist Results

If no job description is provided, the engine performs a generic ATS evaluation.

When a job description is available, the engine generates job-specific insights.

---

# 26. ATS Evaluation Modes

The system supports two evaluation modes.

### General Resume Evaluation

Purpose

Assess overall resume quality independent of a specific job.

Focus Areas

- Resume completeness
- Professional structure
- Readability
- Technical content
- Career progression

---

### Job-Specific Evaluation

Purpose

Measure compatibility between a resume and a particular job.

Additional Checks

- Required skills
- Preferred skills
- Experience alignment
- Education alignment
- Domain relevance
- Keyword coverage

Job-specific evaluations always include the general evaluation.

---

# 27. ATS Scoring Model

ATS scoring is divided into multiple independent dimensions.

### Content Quality

Evaluates

- Professional summary
- Experience descriptions
- Project descriptions
- Action verbs
- Measurable achievements

---

### Skills Score

Evaluates

- Technical skills
- Skill diversity
- Skill relevance
- Modern technology usage

---

### Experience Score

Evaluates

- Years of experience
- Career progression
- Role consistency
- Industry relevance

---

### Education Score

Evaluates

- Degree relevance
- Academic qualifications
- Certifications
- Continuous learning

---

### Project Score

Evaluates

- Technical complexity
- Technology diversity
- Business impact
- Open-source contributions
- Deployment evidence

---

### Formatting Score

Evaluates

- Section organization
- Readability
- Consistency
- ATS-friendly formatting

---

### Keyword Score

Evaluates

- Required keywords
- Preferred keywords
- Contextual keyword usage
- Keyword distribution

---

### Completeness Score

Evaluates

- Contact information
- Skills
- Experience
- Education
- Projects
- Certifications
- Links

---

# 28. Final ATS Score

The overall ATS score is derived from the weighted combination of all category scores.

Example

Overall ATS Score

87

Breakdown

Content

90

Skills

92

Experience

85

Education

88

Projects

91

Formatting

94

Keywords

83

Completeness

89

Weights may evolve over time but the scoring methodology should remain transparent.

---

# 29. Keyword Intelligence

Keyword analysis is performed using both deterministic matching and semantic similarity.

### Deterministic Matching

Detects explicit occurrences of required terms.

Example

Required

FastAPI

Resume

FastAPI

Result

Matched

---

### Semantic Matching

Recognizes conceptually similar skills.

Example

Job

REST API Development

Resume

FastAPI Backend Development

Result

Semantic Match

This reduces false negatives caused by wording differences.

---

# 30. Skill Gap Analysis

The engine compares candidate capabilities with job requirements.

Output Categories

Matched Skills

Missing Skills

Preferred Skills

Emerging Skills

Example

Matched

- Python
- FastAPI
- PostgreSQL

Missing

- Docker
- Redis

Preferred

- Kubernetes

Gap analysis is descriptive rather than punitive.

---

# 31. Recommendation Engine

Recommendations are generated from detected gaps.

Recommendations must be:

Specific

Actionable

Evidence-based

Example

Instead of

Improve resume.

Generate

Add deployment experience to highlight production readiness.

---

Instead of

Missing keywords.

Generate

Include Docker experience in project descriptions if applicable.

Recommendations must never encourage dishonest resume modifications.

---

# 32. Explainable AI

Every ATS recommendation should include reasoning.

Example

Recommendation

Include measurable achievements.

Reason

Your experience section contains responsibilities but lacks quantifiable outcomes.

Evidence

Detected

Designed REST APIs

Suggested

Designed REST APIs serving 50K daily requests.

This enables recruiters and candidates to understand every recommendation.

---

# 33. ATS Report Structure

Every ATS evaluation produces a structured report.

Contains

- Overall score
- Category scores
- Matched skills
- Missing skills
- Keyword analysis
- Strengths
- Weaknesses
- Recommendations
- Evaluation timestamp
- Resume version
- Job reference (optional)

The report is immutable once generated.

A new evaluation creates a new report.

---

# 34. ATS Design Principles

The ATS subsystem follows these principles:

- Separate evaluation from parsing.
- Prefer deterministic analysis where possible.
- Use semantic similarity to reduce keyword bias.
- Generate explainable scores.
- Keep recommendations actionable.
- Preserve historical ATS reports.
- Never automatically reject candidates.
- Support both generic and job-specific evaluations.
- Treat ATS scoring as decision support rather than decision making.

The ATS engine provides structured insights that assist recruiters while keeping final hiring decisions under human control.

---
---

# 35. Semantic Search & Candidate Matching

Semantic Search enables HireMind AI to identify relevant candidates even when resumes and job descriptions use different terminology.

Unlike keyword-based search, semantic search compares the meaning of documents rather than exact words.

This subsystem powers:

- Candidate Search
- Job Recommendations
- AI Matching
- Recruiter Copilot Retrieval
- Similar Candidate Discovery

---

# 36. Matching Pipeline

Every matching request follows the same architecture.

Job Description

↓

Text Normalization

↓

Embedding Generation

↓

Vector Retrieval

↓

Candidate Ranking

↓

Business Rule Scoring

↓

Final Match Results

↓

API Response

Matching is computed dynamically using the latest processed resume version.

---

# 37. Embedding Generation

Embeddings convert textual information into dense numerical vectors.

Embedding Sources

Candidate

- Resume Summary
- Skills
- Experience
- Projects
- Education

Job

- Title
- Description
- Responsibilities
- Requirements
- Preferred Skills

Embedding Model

Sentence Transformers

Recommended Model

all-MiniLM-L6-v2

Embedding Dimension

384

Each candidate and job maintains one active embedding representing its latest version.

---

# 38. Embedding Lifecycle

Candidate Upload

↓

Resume Intelligence

↓

Canonical Resume Profile

↓

Embedding Generation

↓

Store in pgvector

---

Job Creation

↓

Job Parsing

↓

Embedding Generation

↓

Store in pgvector

Embeddings are regenerated whenever the underlying profile changes.

---

# 39. Vector Search

Vector similarity search retrieves the most semantically relevant candidates.

Storage

pgvector

Database

Supabase PostgreSQL

Similarity Metric

Cosine Similarity

Query Flow

Job Embedding

↓

pgvector Index

↓

Top-N Similar Candidates

↓

Ranking Engine

The vector database is optimized for retrieval rather than final ranking.

---

# 40. Candidate Retrieval

The retrieval stage identifies a manageable set of candidate profiles.

Default Retrieval Size

Top 100

Purpose

Reduce search space before applying business rules.

Returned Information

- Candidate ID
- Similarity Score
- Resume Version
- Embedding Reference

Retrieval is purely semantic.

No business-specific constraints are applied at this stage.

---

# 41. Candidate Ranking

Retrieved candidates are re-ranked using structured information.

Ranking Factors

### Semantic Similarity

Measures overall profile relevance.

---

### Required Skills Match

Compares mandatory job skills against candidate capabilities.

---

### Preferred Skills Match

Rewards candidates with additional relevant expertise.

---

### Experience Alignment

Evaluates whether experience falls within the desired range.

---

### Education Alignment

Measures compatibility between educational qualifications and job requirements.

---

### Project Relevance

Rewards projects that closely align with the role.

---

### Certification Relevance

Includes relevant professional certifications where applicable.

---

### Candidate Availability

Considers whether the candidate is actively seeking opportunities.

---

### Recruiter Preferences

Supports optional organization-specific weighting in future versions.

---

# 42. Match Score

The final match score combines semantic relevance with structured evaluation.

Example

Overall Match

92%

Breakdown

Semantic Similarity

94

Required Skills

91

Preferred Skills

88

Experience

93

Education

90

Projects

95

Availability

100

The match score is explainable and reproducible.

---

# 43. Explainable Matching

Every recommendation includes supporting evidence.

Example

Candidate Match

92%

Reasons

- Strong FastAPI experience
- Relevant AI projects
- 4 years backend development
- Experience with PostgreSQL
- Missing Redis experience

Recruiters should understand why a candidate appears in the results.

---

# 44. Similar Candidate Discovery

The platform can identify candidates with similar profiles.

Workflow

Candidate

↓

Embedding

↓

Vector Search

↓

Similar Candidates

Use Cases

- Talent rediscovery
- Replacement recommendations
- Internal benchmarking

---

# 45. Job Recommendation Engine

Matching also works in reverse.

Candidate Profile

↓

Embedding

↓

Vector Search

↓

Relevant Jobs

↓

Ranking

This enables personalized job recommendations for candidates.

---

# 46. Hybrid Search

Some recruiter queries require both structured filters and semantic search.

Example

Search

Backend Engineer

Filters

- Delhi
- Minimum 3 years
- Python
- Remote

Execution

Apply structured filters

↓

Generate query embedding

↓

Semantic retrieval

↓

Ranking

This hybrid approach improves both precision and recall.

---

# 47. Matching Cache

To reduce computation, frequently requested match results may be cached.

Cache Candidates

- Popular jobs
- Frequently viewed candidates
- Recruiter dashboards

Cache Invalidation

Candidate updated

↓

Resume reprocessed

↓

Embedding regenerated

↓

Cache invalidated

↓

Fresh matches generated

The cache is an optimization layer and never acts as the source of truth.

---

# 48. Performance Considerations

Target Retrieval Time

<100 ms

Target Ranking Time

<300 ms

Target Total Match Response

<500 ms

Optimization Strategies

- Vector indexing
- Batch embedding generation
- Asynchronous embedding updates
- Efficient SQL filtering
- Cached frequently accessed results

Performance targets may vary depending on deployment resources.

---

# 49. Matching Design Principles

The Semantic Search subsystem follows these principles:

- Separate retrieval from ranking.
- Use embeddings for meaning rather than exact wording.
- Combine semantic relevance with structured business rules.
- Generate explainable recommendations.
- Keep embeddings immutable until profile changes.
- Support both candidate-to-job and job-to-candidate matching.
- Prefer hybrid search over keyword-only search.
- Treat semantic similarity as one signal, not the final decision.

This architecture enables HireMind AI to deliver fast, accurate, and transparent recommendations while remaining scalable and maintainable.

---
---

# 50. GitHub Intelligence Architecture

GitHub Intelligence enriches candidate profiles by analyzing publicly available GitHub repositories.

Unlike Resume Intelligence, which relies on self-reported information, GitHub Intelligence evaluates publicly visible engineering work.

Its responsibilities include:

- Repository analysis
- Technology detection
- Engineering profile generation
- Open-source contribution analysis
- Project quality assessment
- Developer summarization

GitHub analysis is optional and only performed for candidates who provide a GitHub profile.

---

# 51. GitHub Processing Pipeline

The GitHub Intelligence pipeline is event-driven.

Candidate Connects GitHub

↓

Profile Validation

↓

Repository Metadata Collection

↓

Repository Analysis

↓

Developer Intelligence Generation

↓

AI Enhancement

↓

Schema Validation

↓

Persist Results

↓

GitHub Profile Ready

Analysis executes asynchronously and never blocks recruiter workflows.

---

# 52. GitHub Profile Validation

Before analysis begins, the platform validates the provided GitHub profile.

Validation Checks

- Valid GitHub URL
- Public profile accessibility
- Existing account
- Repository visibility
- API response availability

Invalid or inaccessible profiles are marked with descriptive error states.

---

# 53. Repository Discovery

The platform retrieves repository metadata for analysis.

Collected Metadata

- Repository Name
- Description
- Primary Language
- Topics
- Stars
- Forks
- Watchers
- Last Updated
- Visibility
- Default Branch

Repository metadata is stored separately from AI-generated insights.

---

# 54. Technology Stack Detection

The system identifies technologies used across repositories.

Examples

Programming Languages

- Python
- Java
- TypeScript
- Go
- C++

Frameworks

- FastAPI
- Django
- Spring Boot
- React
- Next.js

Databases

- PostgreSQL
- MongoDB
- MySQL
- Redis

Developer Tools

- Docker
- GitHub Actions
- Terraform
- Kubernetes

Detection combines repository metadata with README analysis where available.

---

# 55. Repository Quality Analysis

Each repository is evaluated independently.

Evaluation Criteria

Project Structure

- Organized directories
- Modular architecture
- Clear naming conventions

Documentation

- README quality
- Setup instructions
- Usage examples
- Architecture explanations

Project Completeness

- Build configuration
- Dependency management
- Deployment guidance

Maintenance

- Recent activity
- Release consistency
- Repository health

Repository quality emphasizes engineering practices rather than popularity.

---

# 56. Engineering Activity Analysis

GitHub Intelligence summarizes engineering activity.

Metrics

- Number of public repositories
- Active repositories
- Recently updated projects
- Language distribution
- Repository diversity

The platform intentionally avoids rewarding raw commit counts.

Commit frequency alone is not a reliable measure of engineering ability.

---

# 57. Project Intelligence

Projects are categorized by technical characteristics.

Examples

Machine Learning

Backend Development

Frontend Development

Mobile Development

DevOps

Data Engineering

Cloud Infrastructure

Cybersecurity

This categorization improves recruiter search and recommendation quality.

---

# 58. AI Developer Summary

After deterministic analysis, the AI layer generates a structured developer profile.

Example

Backend-focused software engineer with strong experience in FastAPI, PostgreSQL, and AI applications. Demonstrates consistent project organization, clear documentation, and practical deployment experience through multiple production-oriented repositories.

The summary is generated from validated repository data rather than raw GitHub text.

---

# 59. Developer Intelligence Profile

GitHub Intelligence produces a structured profile.

Contains

- Primary Technology Stack
- Framework Expertise
- Repository Categories
- Engineering Strengths
- Documentation Quality
- Project Diversity
- Development Focus
- AI-generated Summary
- Analysis Timestamp

This profile becomes part of the Canonical Candidate Profile.

---

# 60. GitHub Score

The platform may expose an overall GitHub score.

Example

Overall Score

90

Breakdown

Repository Quality

92

Technology Diversity

89

Documentation

94

Project Complexity

91

Engineering Consistency

88

Open Source Contribution

86

The score exists primarily for summarization.

Recruiters should always have access to the underlying evidence.

---

# 61. Explainable GitHub Intelligence

Every recommendation should be traceable.

Example

Strength

Excellent backend engineering experience.

Evidence

- Multiple FastAPI repositories
- PostgreSQL integration
- Production deployment documentation

Weakness

Limited frontend exposure.

Evidence

No significant React or frontend-focused repositories detected.

The system explains observations rather than making subjective judgments.

---

# 62. Profile Refresh

Candidates may request a new GitHub analysis.

Refresh Workflow

Candidate Requests Refresh

↓

Retrieve Latest Repository Metadata

↓

Re-run Analysis

↓

Generate Updated Developer Profile

↓

Persist New Version

Historical analyses remain available for auditing where appropriate.

---

# 63. Failure Handling

GitHub analysis is resilient to partial failures.

Examples

GitHub API Unavailable

Profile remains pending.

Retry scheduled.

---

Repository Parsing Failure

Other repositories continue processing.

---

AI Summary Failure

Deterministic analysis is stored.

Summary generation is retried asynchronously.

---

Validation Failure

Profile is not marked as completed until validation succeeds.

The platform favors graceful degradation over complete failure.

---

# 64. GitHub Intelligence Design Principles

The GitHub Intelligence subsystem follows these principles:

- Treat GitHub as supplemental evidence rather than a hiring requirement.
- Perform analysis asynchronously.
- Separate metadata collection from AI interpretation.
- Prefer deterministic engineering analysis before AI summarization.
- Generate explainable developer insights.
- Never rank candidates solely on GitHub activity.
- Preserve historical analysis versions.
- Allow candidates to refresh their profile on demand.

GitHub Intelligence complements Resume Intelligence by providing additional engineering context while ensuring that hiring decisions remain fair, transparent, and based on multiple sources of evidence.

---
---

# 65. AI Recruiter Copilot Architecture

The AI Recruiter Copilot is a Retrieval-Augmented Generation (RAG) system designed specifically for recruitment workflows.

Unlike a general-purpose chatbot, the Copilot answers questions using organization-specific hiring data.

It assists recruiters by:

- Searching candidates
- Summarizing resumes
- Comparing applicants
- Explaining ATS results
- Recommending interview questions
- Answering hiring analytics queries
- Drafting recruiter communications

The Copilot never operates on public internet knowledge when answering organization-specific questions.

---

# 66. Copilot Processing Pipeline

Every Copilot request follows the same lifecycle.

Recruiter Question

↓

Authentication

↓

Organization Resolution

↓

Intent Detection

↓

Retrieval Planning

↓

Data Retrieval

↓

Context Assembly

↓

Prompt Construction

↓

Language Model

↓

Response Validation

↓

Grounded Response

Every response is scoped to the authenticated organization.

---

# 67. Intent Detection

The first stage determines what the recruiter is asking.

Supported Intent Categories

Candidate Search

Job Search

Resume Summary

Candidate Comparison

ATS Explanation

Interview Preparation

Hiring Analytics

Email Drafting

General Hiring Questions

Intent detection determines which retrieval strategy to execute.

---

# 68. Retrieval Strategies

Different intents use different retrieval methods.

### Candidate Retrieval

Uses

- pgvector semantic search
- Structured filters
- ATS reports
- GitHub insights

---

### Job Retrieval

Retrieves

- Job description
- Requirements
- Open positions
- Hiring stages

---

### Resume Retrieval

Retrieves

- Parsed resume
- Resume summary
- Skills
- Projects
- Experience

---

### Analytics Retrieval

Retrieves

- Dashboard metrics
- Hiring funnel
- Pipeline statistics
- Recruiter activity

---

### Interview Retrieval

Retrieves

- Scheduled interviews
- Feedback
- Assessment results

---

### Hybrid Retrieval

Combines vector search with structured SQL queries.

Example

Question

Find senior backend engineers with FastAPI experience who have completed technical interviews.

Execution

Structured Filters

↓

Semantic Search

↓

Merge Results

↓

Ranking

---

# 69. Context Builder

Retrieved information is transformed into a structured context package.

Context Sources

- Resume Intelligence
- ATS Reports
- Canonical Candidate Profile
- GitHub Intelligence
- Job Details
- Applications
- Interview Feedback
- Assessments
- Analytics

Only the minimum required context is included to reduce token usage.

---

# 70. Prompt Builder

The Prompt Builder converts structured context into an LLM-ready prompt.

Prompt Sections

System Instructions

Organization Context

Retrieved Evidence

Recruiter Question

Response Requirements

The Prompt Builder follows standardized templates to ensure consistency.

---

# 71. Language Model Integration

The Copilot uses the Hugging Face Inference API for response generation.

Typical Tasks

- Resume summarization
- Candidate comparison
- Interview question generation
- Hiring insights
- Email drafting
- Recommendation generation

The model receives only validated and organization-scoped context.

No direct database access is provided to the language model.

---

# 72. Response Validation

Generated responses are validated before being returned.

Validation Checks

- Organization scope
- Empty responses
- Unsupported claims
- Response length
- Required citations
- Sensitive data exposure

Responses failing validation are regenerated or replaced with a safe fallback.

---

# 73. Source Attribution

Every AI-generated answer should identify the information it used.

Example

Sources

- Resume Analysis
- GitHub Intelligence
- ATS Report
- Interview Feedback

Source attribution improves recruiter trust and enables manual verification.

---

# 74. Example Workflows

### Candidate Search

Question

Find experienced FastAPI developers.

Pipeline

Intent Detection

↓

Candidate Retrieval

↓

Vector Search

↓

Ranking

↓

LLM Summary

---

### Candidate Comparison

Question

Compare Rahul and Aman for the Backend Engineer role.

Pipeline

Retrieve Candidate Profiles

↓

Retrieve ATS Reports

↓

Retrieve GitHub Profiles

↓

Context Builder

↓

LLM Comparison

---

### Interview Preparation

Question

Generate interview questions for this candidate.

Pipeline

Retrieve Resume

↓

Retrieve Job Description

↓

Skill Gap Analysis

↓

LLM Question Generation

---

### Hiring Analytics

Question

Summarize our hiring pipeline this month.

Pipeline

Structured Analytics Query

↓

Context Builder

↓

LLM Summary

---

# 75. Hallucination Prevention

The Copilot follows a retrieval-first approach.

Rules

- Never answer without retrieved evidence.
- Never fabricate candidate information.
- Never infer skills that are not supported by evidence.
- Never invent interview outcomes.
- Never speculate about candidate intent.

If evidence is unavailable, the Copilot clearly states that it cannot answer from the available data.

---

# 76. Security & Organization Isolation

The Copilot is fully organization-aware.

Every request is validated against:

- Authenticated user
- Organization membership
- Role permissions

The retrieval layer never accesses data belonging to another organization.

Cross-tenant retrieval is prohibited.

---

# 77. Performance Considerations

Target Intent Detection

<20 ms

Target Retrieval

<150 ms

Target Prompt Construction

<20 ms

Target LLM Response

Dependent on model latency

Target Total Response

<2 seconds for common recruiter queries

Optimization Strategies

- Cached embeddings
- Efficient pgvector indexing
- Batched database queries
- Context size limits
- Prompt template reuse

---

# 78. Copilot Design Principles

The AI Recruiter Copilot follows these principles:

- Retrieval before generation.
- Organization-scoped reasoning.
- Explainable responses with source attribution.
- Intent-driven orchestration.
- Minimal context for cost efficiency.
- Human oversight for hiring decisions.
- No autonomous actions.
- Modular retrieval pipelines.
- Provider-agnostic AI service interfaces.

The Copilot acts as an intelligent recruitment assistant, enhancing recruiter productivity while ensuring responses remain accurate, transparent, and grounded in verified organizational data.

---
---

# 79. AI Infrastructure Architecture

The AI Infrastructure layer provides shared services used by every AI-powered feature in HireMind AI.

Business modules never communicate directly with AI providers.

Instead, all AI requests pass through a common AI Platform Layer.

This architecture ensures:

- Reusability
- Maintainability
- Consistency
- Provider independence
- Easier testing
- Lower operational complexity

---

# 80. AI Platform Architecture

The AI Platform consists of several independent services.

Business Service

↓

AI Platform

├── Prompt Service
├── Embedding Service
├── Retrieval Service
├── LLM Service
├── Validation Service
├── Cache Service

↓

External Providers

Each service has a single responsibility.

---

# 81. Prompt Service

The Prompt Service is responsible for constructing prompts used by language models.

Responsibilities

- Prompt templates
- Variable substitution
- Prompt versioning
- Context formatting
- Prompt validation

Example Tasks

- Resume summary prompts
- ATS recommendation prompts
- Candidate comparison prompts
- Interview generation prompts
- Email drafting prompts

Business services never construct prompts manually.

---

# 82. Prompt Versioning

Prompt behavior evolves over time.

Each production prompt has a version.

Example

Resume Summary

v1

↓

v2

↓

v3

Prompt metadata includes

- Version
- Purpose
- Supported model
- Last updated
- Author

Prompt versioning enables controlled improvements without unexpected behavioral changes.

---

# 83. Embedding Service

The Embedding Service generates semantic vector representations.

Responsibilities

- Resume embeddings
- Job embeddings
- Query embeddings
- Batch embedding generation
- Embedding validation

Supported Inputs

- Resume Profile
- Job Description
- Recruiter Query

The service exposes a single interface regardless of the underlying embedding model.

---

# 84. Retrieval Service

The Retrieval Service manages semantic retrieval.

Responsibilities

- pgvector search
- Similarity calculation
- Hybrid retrieval
- Candidate retrieval
- Job retrieval
- Context retrieval

Retrieval strategies are selected by the calling business service.

The Retrieval Service never performs business-specific ranking.

---

# 85. LLM Service

The LLM Service is responsible for all language generation.

Supported Tasks

- Resume summaries
- ATS recommendations
- Candidate comparison
- Interview questions
- Recruiter Copilot
- Email generation

Responsibilities

- Model invocation
- Retry handling
- Timeout management
- Response parsing
- Error recovery

Business services communicate only with the LLM Service.

---

# 86. Validation Service

Every AI response passes through a validation stage.

Validation Checks

- Required fields
- Response schema
- Empty output
- Length constraints
- Organization scope
- Citation availability
- JSON validity (where applicable)

Invalid responses are rejected before reaching business logic.

---

# 87. Cache Service

Frequently requested AI outputs may be cached.

Cache Candidates

- Resume summaries
- ATS reports
- Candidate embeddings
- Job embeddings
- Copilot retrieval results

Cache Invalidation

Resume Updated

↓

Reprocess Resume

↓

Invalidate Cache

↓

Generate Fresh Output

The cache is an optimization layer.

Persistent storage remains the source of truth.

---

# 88. Retry Strategy

External AI providers may experience temporary failures.

Retry Policy

Attempt 1

↓

Retry

↓

Retry

↓

Fail Gracefully

Only transient failures are retried.

Permanent failures return descriptive error responses.

The retry strategy avoids duplicate processing whenever possible.

---

# 89. Timeout Management

Each AI operation has an execution timeout.

Examples

Embedding Generation

Fast timeout

Resume Summary

Medium timeout

Recruiter Copilot

Longer timeout

Operations exceeding their timeout are cancelled and handled gracefully.

Timeout values should be configurable rather than hardcoded.

---

# 90. Background Processing

Long-running AI tasks execute asynchronously.

Examples

- Resume processing
- Embedding generation
- GitHub analysis
- Bulk resume imports
- Batch ATS evaluations

Workflow

Request Received

↓

Persist Initial State

↓

Background Task

↓

Update Status

↓

Notify Client

The API remains responsive while processing continues.

---

# 91. AI Configuration

AI behavior is controlled through configuration.

Configurable Items

- Embedding model
- Language model
- Similarity threshold
- Retrieval limit
- Prompt versions
- Timeout values
- Retry limits

Configuration should be environment-specific.

Business logic must not contain provider-specific constants.

---

# 92. Provider Abstraction

The AI Platform depends on internal interfaces rather than specific vendors.

Example Interface

Embedding Provider

↓

Sentence Transformers

Future Alternatives

↓

Other Embedding Providers

Similarly

Language Model Interface

↓

Hugging Face

↓

Future Provider

This architecture minimizes vendor lock-in.

---

# 93. Security Considerations

The AI Platform follows the same security model as the application.

Requirements

- Organization isolation
- Authenticated requests
- Input validation
- Prompt sanitization
- Sensitive data protection

Prompt construction must include only data the requesting user is authorized to access.

---

# 94. Cost Optimization

The AI Platform minimizes inference cost.

Strategies

- Cache reusable outputs
- Prefer embeddings over LLM generation
- Limit context size
- Reuse processed resume data
- Avoid duplicate embedding generation
- Use deterministic logic whenever possible

Language models are invoked only when generation is required.

---

# 95. AI Infrastructure Design Principles

The AI Infrastructure layer follows these principles:


- Separate business logic from AI providers.
- Centralize prompt management.
- Reuse shared AI services.
- Validate every AI response.
- Execute long-running operations asynchronously.
- Keep providers replaceable.
- Optimize for low latency and low cost.
- Preserve organization isolation.
- Favor deterministic processing over generation when possible.

The AI Platform serves as the shared foundation for every intelligent capability in HireMind AI, enabling consistent behavior, easier maintenance, and future extensibility.

---
---

# 96. AI Evolution Roadmap

The AI Platform is designed to evolve incrementally while preserving stable interfaces for the rest of the application.

Business services should not require significant changes when AI capabilities improve.

The roadmap is organized into progressive maturity phases.

---

# Phase 1 — Intelligent Recruitment Platform (Current)

The first production version focuses on assisting recruiters with structured AI capabilities.

Implemented Features

✓ Resume Intelligence

✓ ATS Intelligence

✓ Semantic Candidate Matching

✓ Job Matching

✓ GitHub Intelligence

✓ AI Recruiter Copilot

✓ Resume Recommendations

✓ Interview Question Generation

✓ Analytics Summaries

Characteristics

- Human-in-the-loop
- Explainable recommendations
- Organization-aware retrieval
- Modular AI services
- Low operational cost

---

# Phase 2 — Advanced Recruitment Intelligence

The second phase enhances decision support using richer analytics and learning from historical hiring data.

Planned Capabilities

### Candidate Clustering

Automatically group candidates by:

- Technical domain
- Seniority
- Skill specialization
- Industry experience

---

### Skill Taxonomy

Develop an internal skill graph that understands relationships between technologies.

Example

Python

↓

FastAPI

↓

REST APIs

↓

Microservices

↓

Cloud Deployment

This enables more intelligent recommendations than exact keyword matching.

---

### Hiring Trend Analysis

Generate insights such as:

- Most in-demand skills
- Frequently missing competencies
- Average hiring duration
- Interview conversion rates
- Offer acceptance trends

---

### Personalized Recruiter Recommendations

Recommend candidates based on:

- Previous hiring decisions
- Recruiter preferences
- Organization hiring patterns

Recommendations remain explainable and configurable.

---

# Phase 3 — AI Workflow Automation

AI begins assisting with operational recruitment workflows.

Examples

Interview scheduling suggestions

↓

Candidate follow-up reminders

↓

Pipeline bottleneck detection

↓

Recruiter workload balancing

↓

Hiring timeline optimization

These workflows remain approval-based.

The AI never performs irreversible actions autonomously.

---

# Phase 4 — Intelligent AI Agents

Specialized agents collaborate through the AI Platform Layer.

Potential Agents

Resume Agent

ATS Agent

Matching Agent

Interview Agent

Analytics Agent

Communication Agent

Each agent performs one responsibility and communicates through well-defined service interfaces.

The existing backend architecture remains unchanged.

---

# Phase 5 — Enterprise Intelligence

The platform supports enterprise-scale AI capabilities.

Potential Features

Private model deployment

Organization-specific retrieval optimization

Advanced ranking strategies

Large-scale analytics

Multi-region deployment

Advanced compliance tooling

Enhanced explainability dashboards

These capabilities build upon the existing modular AI Platform rather than replacing it.

---

# 97. Future AI Capabilities

Potential future enhancements include:

Resume language translation

Portfolio analysis

Technical document analysis

Research publication analysis

Open-source contribution quality analysis

Candidate growth tracking

Interview transcript summarization

Voice interview assistance

Multimodal candidate profiles

These capabilities are optional extensions and should integrate through existing AI service interfaces.

---

# 98. AI Governance

The AI Platform should remain transparent, auditable, and accountable.

Guidelines

- AI assists recruiters rather than replacing them.
- Hiring decisions remain under human control.
- Every recommendation should be explainable.
- AI outputs should be reproducible where possible.
- Historical AI reports should remain immutable.
- Model changes should not invalidate previous evaluations.

Governance policies evolve alongside regulatory requirements.

---

# 99. AI Ethics

HireMind AI is designed to support fair and responsible recruitment.

Principles

Fairness

Recommendations should focus on professional qualifications and job relevance.

Transparency

Users should understand why recommendations are generated.

Privacy

Candidate information is processed only for authorized recruitment purposes.

Accountability

Recruiters remain responsible for hiring decisions.

Security

Organization data must remain isolated at all times.

The platform should continuously review AI behavior for unintended bias and maintain mechanisms for human review.

---

# 100. AI Maintainability

The AI Platform is designed for long-term maintainability.

Engineering Principles

- Modular AI services
- Provider abstraction
- Configuration-driven behavior
- Versioned prompts
- Versioned AI reports
- Shared validation framework
- Shared retrieval infrastructure
- Independent service testing

This enables individual AI components to evolve without impacting unrelated parts of the application.

---

# 101. Success Metrics

The effectiveness of the AI Platform should be measured using operational and product metrics.

Operational Metrics

- Resume processing latency
- Embedding generation time
- Semantic retrieval latency
- Copilot response time
- Background task completion time

Quality Metrics

- Resume parsing accuracy
- Skill extraction accuracy
- Matching precision
- ATS recommendation acceptance
- Copilot answer relevance

Business Metrics

- Recruiter time saved
- Time-to-shortlist
- Interview conversion rate
- Offer acceptance rate
- Recruiter satisfaction

These metrics help guide future improvements without coupling the architecture to any specific AI provider.

---

# 102. AI Architecture Summary

The HireMind AI Platform consists of seven production AI subsystems.

1. Resume Intelligence
2. ATS Intelligence
3. Semantic Search & Matching
4. GitHub Intelligence
5. AI Recruiter Copilot
6. AI Infrastructure
7. Shared AI Platform Services

Together, these components provide a scalable, modular, and explainable AI ecosystem for recruitment.

Core Architectural Characteristics

- Retrieval before generation
- Hybrid deterministic + AI processing
- Organization-scoped reasoning
- Explainable recommendations
- Human-in-the-loop decision making
- Provider-independent architecture
- Modular AI services
- Asynchronous processing
- Shared AI Platform Layer

The AI Architecture is intentionally separated from business logic so that models, providers, prompts, and retrieval strategies can evolve independently while maintaining stable APIs and consistent application behavior.

---