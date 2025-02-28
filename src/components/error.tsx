export function ErrorComponent({ message }: { message?: string }) {
    if (!message) return null;
    return (
      <tr>
        <td colSpan={4} className="border p-2 text-center">Error: {message}</td>
      </tr>
    );
  }