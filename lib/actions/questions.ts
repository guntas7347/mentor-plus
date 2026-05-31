"use server";

import prisma from "../prisma";

export const createQuestionSet = async () => {
  const existing = await prisma.questionSet.findFirst({
    where: {
      title: "Untitled Question Set",
    },
  });

  if (existing) {
    return {
      success: false,
      error:
        "A question set with title 'Untitled Question Set' already exists.",
    };
  }

  const questionSet = await prisma.questionSet.create({
    data: {
      title: "Untitled Question Set",
    },
  });

  return {
    success: true,
    data: questionSet,
  };
};

type TranslationInput = {
  lang: string;
  q: string;

  o1: string;
  o2: string;
  o3: string;
  o4: string;

  correctOptions?: number[];
};

type QuestionGroupInput = {
  qn: number;
  translations: TranslationInput[];
};

export const importQuestions = async (
  questionSetId: string,
  questions: QuestionGroupInput[],
) => {
  return prisma.$transaction(async (tx) => {
    const createdGroups = await Promise.all(
      questions.map((question) =>
        tx.questionGroup.create({
          data: {
            questionSetId,
            questionNo: question.qn,
          },
        }),
      ),
    );

    const allQuestions = questions.flatMap((question, index) =>
      question.translations.map((translation) => ({
        questionGroupId: createdGroups[index].id,

        language: translation.lang,
        question: translation.q,

        option1: translation.o1,
        option2: translation.o2,
        option3: translation.o3,
        option4: translation.o4,

        correctOptions: translation.correctOptions ?? [],
      })),
    );

    await tx.question.createMany({
      data: allQuestions,
    });

    return {
      questionGroupsCreated: createdGroups.length,
      questionsCreated: allQuestions.length,
    };
  });
};

export const getAllQuestions = async (questionSetId: string) => {
  const questionSet = await prisma.questionSet.findUnique({
    where: {
      id: questionSetId,
    },
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
  });

  if (!questionSet) {
    throw new Error("Question set not found");
  }

  return {
    id: questionSet.id,
    title: questionSet.title,
    questions: questionSet.questions.map((group) => ({
      groupId: group.id,
      qn: group.questionNo,

      translations: group.translations.map((translation) => ({
        id: translation.id,
        lang: translation.language,

        q: translation.question,

        o1: translation.option1,
        o2: translation.option2,
        o3: translation.option3,
        o4: translation.option4,

        correctOptions: translation.correctOptions,
      })),
    })),
  };
};

export const getAllQuestionSets = async () => {
  const questionSets = await prisma.questionSet.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: {
        select: {
          questions: true, // QuestionGroup count
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return questionSets.map((set) => ({
    id: set.id,
    title: set.title,
    createdAt: set.createdAt,
    questionCount: set._count.questions,
  }));
};

export const updateQuestionSetTitle = async (id: string, title: string) => {
  return await prisma.questionSet.update({
    where: {
      id,
    },
    data: { title },
  });
};

export const updateQuestion = async (id: string, question: string) => {
  return await prisma.question.update({
    where: {
      id,
    },
    data: { question },
  });
};

export const deleteQuestionGroup = async (questionGroupId: string) => {
  return prisma.questionGroup.delete({
    where: {
      id: questionGroupId,
    },
  });
};

export const deleteQuestionSet = async (id: string) => {
  return prisma.questionSet.delete({
    where: {
      id,
    },
  });
};
