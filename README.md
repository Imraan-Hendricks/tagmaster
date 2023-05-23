# TagMaster

### Revolutionize your development workflow with TagMaster and experience bulletproof commits, accelerated releases, and seamless versioning!

<br />

[![npm version](https://img.shields.io/npm/v/tagmaster.svg)](https://www.npmjs.com/package/@imraan-hendricks/tagmaster)

<br />

Supercharge your commit management and release workflows with TagMaster, an all-in-one npm package meticulously designed to enhance the surety, consistency, and speed of your development process. TagMaster offers a seamless interface for conventional commits, enabling you to enforce strictness and consistency throughout your commit history. TagMster includes powerful validation (linting) capabilities out of the box ensuring that commits adhere to predefined rules and best practices, guaranteeing high code quality and adherence to commit guidelines. TagMaster simplifies release and tag management in accordance to semantic versioning principles and effortlessly handles pre-releases like alpha and beta. Additionally, TagMaster automatically generates a comprehensive CHANGELOG, allowing you to easily track and communicate the evolution of your project. With TagMaster, you can confidently manage commits, releases, and tags, while maintaining a clear and organized record of your project's changes. Commit with unwavering confidence, unleash the full potential of your CI/CD pipelines, and streamline your release cycles.

## Features

- **Conventional Commits**: Maintain a standardized commit format across your projects, promoting better collaboration and code comprehension.
- **Validation (Linting) Out of the Box**: Automatically validate commits against predefined rules and best practices, guaranteeing code quality and adherence to commit guidelines.
- **Release and Tag Management**: Effortlessly manage releases and tags, ensuring accurate versioning in accordance with semantic versioning principles.
- **Pre-releases Support**: Seamlessly handle pre-release versions such as alpha and beta, facilitating effective testing and gathering early feedback.
- **Auto-generated CHANGELOG.md**: Generate a comprehensive changelog file that documents all the changes made in each release, making it easy to track and communicate the evolution of your project.
- **License Generation**: Automatically generate a LICENSE file, such as the MIT License, providing clarity on the licensing terms of your project.
- **Small Size, Big Impact**: TagMaster is optimized for efficiency and comes with a small footprint, allowing you to integrate it seamlessly into your projects without bloating your dependencies.
- **One Install, One Script**: With TagMaster, you get everything you need in a single npm package. It's a lightweight and streamlined solution, designed to simplify your workflow without unnecessary complexity.

## Installation

Install TagMaster using npm:

```shell
npm install --save-dev @imraan-hendricks/tagmaster
```

or with Yarn:

```shell
yarn add @imraan-hendricks/tagmaster
```

### Usage

TagMaster offers a powerful command-line interface (CLI) that seamlessly integrates into your development workflow. Here's an example of how to leverage TagMaster:

#### 1) Add the TagMaster script to your package.json:

```
{
    name: "your-package-name"
    "scripts":{
        "tagmaster": "tagmaster"
    }
    ....
}
```

#### 2) Run the TagMaster script:

```
npm run tagmaster
```

You will be presented with a menu to select the operation:

- If you choose commit, TagMaster will guide you through creating a conventional commit, including specifying the commit type, scope, description, breaking changes, and associated issue references. It will generate a commit message based on your input.

- If you choose release, TagMaster allows you to easily create different types of releases such as major, minor, and patch. You can also create pre-releases like alpha and beta. TagMaster will update the version, generate a CHANGELOG.md file that documents all the changes made in the release, and push the changes and tags to your repository.

- If you choose license, TagMaster will generate a LICENSE file for your project. You can choose from a variety of licenses such as MIT, Apache, GPL, etc. It provides clarity on the licensing terms of your code.

For more detailed information, advanced usage, and customization options, please refer to the [documentation](https://github.com/Imraan-Hendricks/tagmaster).

### Contributing

Contributions are always welcome! If you encounter any issues, have suggestions, or want to contribute improvements, please open an issue or submit a pull request in the [Github repository](https://github.com/Imraan-Hendricks/tagmaster).

### Support

If you have any questions, issues, or need assistance, please feel free to reach out to our support team at support@imraanhendricks.com. We are here to help and will get back to you as soon as possible.

### License

This project is licensed under the [MIT License](https://github.com/Imraan-Hendricks/tagmaster/blob/main/LICENSE).
