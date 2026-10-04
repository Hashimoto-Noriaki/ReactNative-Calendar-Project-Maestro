import { deleteSchedule } from './delete-schedule';

const mockFetch = (ok: boolean) => {
  global.fetch = jest.fn().mockResolvedValue({ ok });
};

describe('deleteSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('指定した id の予定を DELETE する', async () => {
    mockFetch(true);

    await expect(deleteSchedule(3)).resolves.toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/schedules\/3$/),
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('レスポンスがエラーのときは例外を投げる', async () => {
    mockFetch(false);

    await expect(deleteSchedule(3)).rejects.toThrow('予定の削除に失敗しました');
  });
});
