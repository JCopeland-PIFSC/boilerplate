import { dispatchToast } from "./useToast";

describe('useToast', () => {
  it('should dispatch a toast event', () => {
    let dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');

    dispatchToast({ message: "Hello", status: "ok" });

    let dispatchedEvent = dispatchEventSpy.mock.calls[0][0];
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    expect(dispatchedEvent.type).toBe("radfish:dispatchToast");
    expect(dispatchedEvent.detail).toMatchObject({ message: "Hello", status: "ok" });
    expect(dispatchedEvent.detail.expires_at).toBeGreaterThan(Date.now());
  })
});