"use server";

import prisma from "../prisma";

export const createExam = async (title: string, questionSetIds: string[]) => {
  const examCode = crypto.randomUUID().slice(0, 8).toUpperCase();

  return prisma.exam.create({
    data: {
      title,
      examCode,
      questionSets: {
        connect: questionSetIds.map((id) => ({ id })),
      },
    },
  });
};

export const getExamAdmin = async (id: string) => {
  return prisma.exam.findUnique({
    where: {
      id,
    },
    include: {
      questionSets: {
        select: {
          id: true,
          title: true,
        },
      },
      attempts: {
        select: {
          rollNumber: true,
          studentName: true,
          totalQuestions: true,
          totalCorrect: true,
          submittedAt: true,
        },
      },
    },
  });
};

export async function getAllExams() {
  return prisma.exam.findMany({
    include: {
      questionSets: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

export async function getExam(examCode: string) {
  const exam = await prisma.exam.findUnique({
    where: { examCode },
    include: {
      questionSets: {
        include: {
          questions: {
            orderBy: {
              questionNo: "asc",
            },
            include: {
              translations: {
                orderBy: {
                  language: "asc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!exam) {
    return null;
  }

  const questions = exam.questionSets.flatMap((questionSet) =>
    questionSet.questions.map((group) => ({
      qn: group.questionNo,
      translations: group.translations.map((translation) => ({
        lang: translation.language,
        q: translation.question,

        o1: translation.option1,
        o2: translation.option2,
        o3: translation.option3,
        o4: translation.option4,

        correctOptions: translation.correctOptions,
      })),
    })),
  );

  return {
    id: exam.id,
    title: exam.title,
    examCode: exam.examCode,
    questions,
  };
}

type SubmitExamInput = {
  examId: string;
  studentName: string;
  rollNumber: string;
  totalQuestions: number;
  totalCorrect: number;
};

export async function submitExam(data: SubmitExamInput) {
  return prisma.examAttempt.create({
    data: {
      examId: data.examId,
      studentName: data.studentName,
      rollNumber: data.rollNumber,
      totalQuestions: data.totalQuestions,
      totalCorrect: data.totalCorrect,
    },
  });
}
