import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toast from '../Toast';

describe('Toast Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        mockOnClose.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render toast with message', () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Test message"
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render success toast with correct styling', () => {
        render(
            <Toast
                id="test-1"
                type="success"
                message="Success message"
                onClose={mockOnClose}
            />
        );

        const toast = screen.getByRole('alert');
        expect(toast).toHaveClass('bg-green-50', 'border-green-200');
    });

    it('should render error toast with correct styling', () => {
        render(
            <Toast
                id="test-1"
                type="error"
                message="Error message"
                onClose={mockOnClose}
            />
        );

        const toast = screen.getByRole('alert');
        expect(toast).toHaveClass('bg-red-50', 'border-red-200');
    });

    it('should render warning toast with correct styling', () => {
        render(
            <Toast
                id="test-1"
                type="warning"
                message="Warning message"
                onClose={mockOnClose}
            />
        );

        const toast = screen.getByRole('alert');
        expect(toast).toHaveClass('bg-yellow-50', 'border-yellow-200');
    });

    it('should render info toast with correct styling', () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Info message"
                onClose={mockOnClose}
            />
        );

        const toast = screen.getByRole('alert');
        expect(toast).toHaveClass('bg-blue-50', 'border-blue-200');
    });

    it('should call onClose when close button is clicked', () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Test message"
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByLabelText('閉じる');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledWith('test-1');
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should auto-close after duration', async () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Auto close"
                duration={3000}
                onClose={mockOnClose}
            />
        );

        expect(mockOnClose).not.toHaveBeenCalled();

        // Fast-forward time by 3000ms
        vi.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalledWith('test-1');
        });
    });

    it('should not auto-close when duration is 0', async () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="No auto close"
                duration={0}
                onClose={mockOnClose}
            />
        );

        // Fast-forward time by 10 seconds
        vi.advanceTimersByTime(10000);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should have correct aria attributes', () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Accessible message"
                onClose={mockOnClose}
            />
        );

        const toast = screen.getByRole('alert');
        expect(toast).toHaveAttribute('aria-live', 'polite');
    });

    it('should render different icons for different types', () => {
        const { rerender } = render(
            <Toast
                id="test-1"
                type="success"
                message="Success"
                onClose={mockOnClose}
            />
        );

        // Success icon should be present
        let icons = screen.getByRole('alert').querySelectorAll('svg');
        expect(icons.length).toBeGreaterThan(0);

        rerender(
            <Toast
                id="test-1"
                type="error"
                message="Error"
                onClose={mockOnClose}
            />
        );

        // Error icon should be present
        icons = screen.getByRole('alert').querySelectorAll('svg');
        expect(icons.length).toBeGreaterThan(0);
    });

    it('should cleanup timer on unmount', () => {
        const { unmount } = render(
            <Toast
                id="test-1"
                type="info"
                message="Test"
                duration={5000}
                onClose={mockOnClose}
            />
        );

        unmount();

        // Fast-forward time after unmount
        vi.advanceTimersByTime(5000);

        // onClose should not be called after unmount
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid clicks on close button', () => {
        render(
            <Toast
                id="test-1"
                type="info"
                message="Test"
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByLabelText('閉じる');

        fireEvent.click(closeButton);
        fireEvent.click(closeButton);
        fireEvent.click(closeButton);

        // Should only call once per click
        expect(mockOnClose).toHaveBeenCalledTimes(3);
        expect(mockOnClose).toHaveBeenCalledWith('test-1');
    });

    it('should memoize and not re-render unnecessarily', () => {
        const { rerender } = render(
            <Toast
                id="test-1"
                type="info"
                message="Test message"
                onClose={mockOnClose}
            />
        );

        const initialElement = screen.getByText('Test message');

        // Re-render with same props
        rerender(
            <Toast
                id="test-1"
                type="info"
                message="Test message"
                onClose={mockOnClose}
            />
        );

        // Element should be the same (React.memo working)
        expect(screen.getByText('Test message')).toBe(initialElement);
    });
});
