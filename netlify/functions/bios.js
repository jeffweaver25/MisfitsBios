export async function handler(event, context) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyt23JD_acv04cG45sFKrWYfplR4XLI3TL4sShacel0Qvld05Nb4kUVQMHieJg7y8ZfkQ/exec"
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Failed to fetch from source: ${response.statusText}`,
      };
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server error: ${error.message}`,
    };
  }
}
