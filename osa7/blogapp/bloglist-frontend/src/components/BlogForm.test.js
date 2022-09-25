import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<Blogform /> updates calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("placeholder title");
  const titleAuthor = screen.getByPlaceholderText("placeholder author");
  const titleUrl = screen.getByPlaceholderText("placeholder url");

  const createButton = screen.getByText("create");

  await user.type(titleInput, "X");
  await user.type(titleAuthor, "Author X");
  await user.type(titleUrl, "x.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("X");
  expect(createBlog.mock.calls[0][0].author).toBe("Author X");
  expect(createBlog.mock.calls[0][0].url).toBe("x.com");
});
