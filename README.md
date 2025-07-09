# UnifConect - Frontend 🎨

![Framework](https://img.shields.io/badge/Framework-React-blue?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge)
![Tooling](https://img.shields.io/badge/Tooling-Vite-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Este é o repositório do frontend da **UNIFConect**, uma plataforma colaborativa para estudantes universitários. Esta aplicação foi desenvolvida como uma *Single Page Application* (SPA) e é responsável por toda a interface e experiência do usuário.

A interface foi projetada para ser componentizada, intuitiva e totalmente desacoplada do backend, comunicando-se com ele através de uma API REST.

## ✨ Funcionalidades

-   **Interface Reativa:** Construída com componentes reutilizáveis para uma experiência de usuário fluida.
-   **Fluxo de Autenticação:** Telas de login e cadastro com armazenamento seguro de token.
-   **Rotas Protegidas:** Acesso a páginas específicas apenas para usuários autenticados.
-   **Feed de Ofertas:** Visualização, busca e filtro de atividades e serviços compartilhados.
-   **Criação de Conteúdo:** Formulários para criação de novas ofertas e upload de materiais no acervo.

## 🛠️ Tecnologias Utilizadas

-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Biblioteca Principal:** [React](https://react.dev/)
-   **Ferramenta de Build:** [Vite](https://vitejs.dev/)
-   **Roteamento:** [React Router DOM](https://reactrouter.com/)
-   **Cliente HTTP:** [Axios](https://axios-http.com/)
-   **UI Library:** [Material-UI (MUI)](https://mui.com/)

## ⚙️ Guia de Instalação e Execução

Para executar o frontend localmente, siga os passos abaixo.
#### Você precisa estar rodando o backend(https://github.com/Davi-dosSantos/UNIFConect-backend), para que todas as funções funcionem adequadamente devido a autenticação.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   **O backend da aplicação deve estar rodando localmente**, pois o frontend depende dele para buscar dados e realizar a autenticação.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Davi-dosSantos/UNIFConect-Frontend.git](https://github.com/Davi-dosSantos/UNIFConect-Frontend.git)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd unifconect-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto.
    -   Aponte a `VITE_API_BASE_URL` para o endereço onde o backend está rodando (por padrão, `http://localhost:3333`).
    ```env
    # URL base da API do backend
    VITE_API_BASE_URL=http://localhost:3333
    ```

5.  **Inicie a aplicação de desenvolvimento:**
    ```bash
    npm run dev
    ```

✅ A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
**Desenvolvido por Davi dos Santos Costa**
