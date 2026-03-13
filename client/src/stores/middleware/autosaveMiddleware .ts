// const autosaveMiddleware = (store: any) => (next: any) => (action: any) => {
//   setInterval(async () => {
//     const state = store.getState().quizBuilder;

//     if (!state.dirty) return;
//     if (state.saving) return;

//     store.dispatch({ type: "quiz/saving" });

//     await fetch("/api/quiz/draft", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(state),
//     });

//     store.dispatch({ type: "quiz/saved" });
//   }, 5000);

//   return (next) => (action) => next(action);
// };
