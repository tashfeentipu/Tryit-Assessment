export function LoadingComponent({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;
    return (
        <tr>
            <td colSpan={4} className="border p-2 text-center">Loading...</td>
        </tr>
    );
}