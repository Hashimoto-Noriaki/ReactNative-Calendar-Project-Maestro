import { updateSchedule } from './update-schedule';

const schedule = { id: 3, title: '打ち合わせ', date: '2026-10-04', description: '会議室A' };

const mockFetch = (body: unknown, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({ ok, json: () => Promise.resolve(body) });
};

describe('updateSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('id 以外の項目を PATCH し、更新された予定を返す', async () => {
    mockFetch(schedule);

    await expect(updateSchedule(schedule)).resolves.toEqual(schedule);
    const { id: _id, ...body } = schedule;
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/schedules\/3$/),
      expect.objectContaining({ method: 'PATCH', body: JSON.stringify(body) }),
    );
  });

  it('レスポンスがエラーのときは例外を投げる', async () => {
    mockFetch({ message: 'Not Found' }, false);

    await expect(updateSchedule(schedule)).rejects.toThrow('予定の更新に失敗しました');
  });

  it('レスポンスの形式が正しくないときは例外を投げる', async () => {
    mockFetch({ ...schedule, id: '3' });

    await expect(updateSchedule(schedule)).rejects.toThrow('予定のデータの形式が正しくありません');
  });
});
