import { z } from 'zod';

export const onboardingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .refine((v) => !/\s/.test(v), {
      message: '이름을 정확히 입력해주세요',
    }),
  gender: z.enum(['MALE', 'FEMALE']),
  job: z.string().min(1),
  isMarried: z.boolean(),
  hasChild: z.boolean(),
  isDriver: z.boolean(),

  birthYear: z.string().regex(/^\d{4}$/),
  birthMonth: z.string().regex(/^\d{1,2}$/),
  birthDay: z.string().regex(/^\d{1,2}$/),

  health: z.object({
    self: z.array(z.string()).min(1),
    family: z.array(z.string()).min(1),
  }),

  coverageIndices: z.array(z.number()).min(1).max(3),

  priceRange: z
    .tuple([z.number(), z.number()])
    .refine(([min, max]) => min < max),
});

export type onboardingFormType = z.infer<typeof onboardingFormSchema>;

export const onboardingDefaultValues: onboardingFormType = {
  name: '',
  gender: 'FEMALE',
  job: '',
  isMarried: false,
  hasChild: false,
  isDriver: false,
  birthYear: '',
  birthMonth: '',
  birthDay: '',

  health: { self: [], family: [] },
  coverageIndices: [],
  priceRange: [7, 15],
};
