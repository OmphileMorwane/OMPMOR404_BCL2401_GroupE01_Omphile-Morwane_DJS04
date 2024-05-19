# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

## Discussion and Reflections

I chose to encapsulate the function related to rendering the book preview into a custom web component to promote  code organization. I also used the Shadow DOM within the custom web component ensures encapsulation of styles and DOM structure, preventing style conflicts and enhancing the component's isolation. By defining observed attributes (author, image, id, title) in the bookPreview component, we enable dynamic updates based on attribute changes, enhancing the component's responsiveness. For abstraction, I used a modular design approach, the codebase is structured into distinct functions such as renderBooks, createBookElement, createOptionElement, renderGenres, renderAuthors, setTheme, showMoreBtn, filterBooks, etc. This promotes the separation of concerns, enhancing the maintainability of the codebase. Each function encapsulates a specific set of tasks, facilitating easier debugging, testing, and modification.

## Challenges faced

I had a limited amount of time to grasp the web component concept. I understand the concpet but not to the extend of applying it. I spent a lot of time trying to apply all the bits and snippets that I grasped from the external resources like YouTube and the LMS content. I understood the LMS contenct but the information was a lot for me to grasp in two days. My code did not work after incapsulating, I had to change a few codes to make it work. There was a point where I had to start all over again and as I was refractoring, it worked and I stopped working on the code.

## Reflections

This project showed me how much I still need to work on, but as Abstractions and web components were abit of new concepts, I don't put too much pressure on myself as I will give myself more time to understand then so that I can be able to apply them in the future.

