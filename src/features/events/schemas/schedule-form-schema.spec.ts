import {
  DESCRIPTION_MAX_LENGTH,
  scheduleFormSchema,
  TITLE_MAX_LENGTH,
} from './schedule-form-schema';

const validInput = { title: '打ち合わせ', date: '2026-10-04', description: '' };

const getErrorMessages = (input: Record<string, string>) => {
  const result = scheduleFormSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
};

describe('scheduleFormSchema', () => {
  it('正しい入力は通る', () => {
    expect(scheduleFormSchema.safeParse(validInput).success).toBe(true);
  });

  it('タイトルと説明の前後の空白を取り除く', () => {
    const result = scheduleFormSchema.parse({
      ...validInput,
      title: '  会議  ',
      description: ' メモ ',
    });
    expect(result.title).toBe('会議');
    expect(result.description).toBe('メモ');
  });

  describe('タイトル', () => {
    it('空のときはエラーになる', () => {
      expect(getErrorMessages({ ...validInput, title: '' })).toEqual([
        'タイトルを入力してください',
      ]);
    });

    it('空白だけのときはエラーになる', () => {
      expect(getErrorMessages({ ...validInput, title: '   ' })).toEqual([
        'タイトルを入力してください',
      ]);
    });

    it(`${TITLE_MAX_LENGTH}文字までは通り、超えるとエラーになる`, () => {
      expect(getErrorMessages({ ...validInput, title: 'あ'.repeat(TITLE_MAX_LENGTH) })).toEqual([]);
      expect(getErrorMessages({ ...validInput, title: 'あ'.repeat(TITLE_MAX_LENGTH + 1) })).toEqual(
        [`タイトルは${TITLE_MAX_LENGTH}文字以内で入力してください`],
      );
    });
  });

  describe('日付', () => {
    it('存在しない日付はエラーになる', () => {
      expect(getErrorMessages({ ...validInput, date: '2026-02-30' })).toEqual([
        '日付を選択してください',
      ]);
    });

    it('うるう年の2月29日は通る', () => {
      expect(getErrorMessages({ ...validInput, date: '2028-02-29' })).toEqual([]);
    });
  });

  describe('説明', () => {
    it(`${DESCRIPTION_MAX_LENGTH}文字までは通り、超えるとエラーになる`, () => {
      const ok = 'あ'.repeat(DESCRIPTION_MAX_LENGTH);
      const ng = 'あ'.repeat(DESCRIPTION_MAX_LENGTH + 1);
      expect(getErrorMessages({ ...validInput, description: ok })).toEqual([]);
      expect(getErrorMessages({ ...validInput, description: ng })).toEqual([
        `説明は${DESCRIPTION_MAX_LENGTH}文字以内で入力してください`,
      ]);
    });
  });
});
