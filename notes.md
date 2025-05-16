react-hot-toast is a react library for notifications.
zustand for global state management

saving to the localStorage means that even if we refresh the page the changes will remain same.
We used localStorage for theme

// MessageInput.jsx
reader.onloadend = () => {
setImagePreview(reader.result);
};
reader.readAsDataURL(file);

The onloadend event fires after the file has been fully read.

At this point, reader.result contains the Base64 string representation of the image.

We use setImagePreview(reader.result); to update the state and trigger a re-render of the component, allowing the image preview to be displayed.

Although the order doesm't matter,
Always define event handlers before starting an asynchronous process. That way, we ensure that the handler is ready before the event occurs.

//For deployment
earlier frontend-localhost:5173
backend-localhost:5000
so we take both under 1 domain only
