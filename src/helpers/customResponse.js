export default function customResponse({ response, code = 500, message, data }) {
  switch(code) {
    case 200:
      return response.status(200).json({
        code: 200,
        message: message || "Success!",
        data: data || {}
      })
    case 201:
      return response.status(201).json({
        code: 201,
        message: message || "Created!",
        data: data || {}
      })
    case 400:
      return response.status(400).json({
        code: 400,
        message: message || "Bad request!",
        data: data || {}
      })
    case 404:
      return response.status(404).json({
        code: 404,
        message: message || "Not found!",
        data: data || {}
      })
    case 500:
      return response.status(500).json({
        code: 500,
        message: message || "Internal Server Error!",
        data: data || {}
      })
  }
}
