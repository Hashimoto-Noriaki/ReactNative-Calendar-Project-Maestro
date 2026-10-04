import { createSchedule } from './create-schedule';

const newSchedule = { title: '打ち合わせ', date: '2026-10-04', description: '会議室A' };

const mockFetch = (body: unknown, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({ ok, json: () => Promise.resolve(body) });
};

describe('createSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('予定を POST し、作成された予定を返す', async () => {
    mockFetch({ id: 6, ...newSchedule });

    await expect(createSchedule(newSchedule)).resolves.toEqual({ id: 6, ...newSchedule });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/schedules$/),
      expect.objectContaining({ method: 'POST', body: JSON.stringify(newSchedule) }),
    );
  });

  it('レスポンスがエラーのときは例外を投げる', async () => {
    mockFetch({}, false);

    await expect(createSchedule(newSchedule)).rejects.toThrow('予定の作成に失敗しました');
  });

  it('レスポンスの形式が正しくないときは例外を投げる', async () => {
    mockFetch({ id: '6', ...newSchedule });

    await expect(createSchedule(newSchedule)).rejects.toThrow(
      '予定のデータの形式が正しくありません',
    );
  });
});
