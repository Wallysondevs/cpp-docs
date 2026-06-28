# std::error_category

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
class error_category;
```

`std::error_category` serve como a classe base para tipos de categoria de erro específicos, como [std::system_category](<#/doc/error/system_category>), [std::iostream_category](<#/doc/io/iostream_category>), etc. Cada classe de categoria específica define o mapeamento `error_code` - `error_condition` e mantém as strings explicativas para todas as `error_conditions`. Os objetos das classes de categoria de erro são tratados como singletons, passados por referência.

### Funções membro

[ (construtor)](<#/doc/error/error_category/error_category>) | constrói um `error_category`
(função membro pública)
[ (destrutor)](<#/doc/error/error_category/~error_category>)[virtual] | destrói um `error_category`
(função membro pública virtual)
operator=[deleted] | não atribuível por cópia
(função membro pública)
[ name](<#/doc/error/error_category/name>)[virtual] | obtém o nome da categoria
(função membro pública virtual)
[ default_error_condition](<#/doc/error/error_category/default_error_condition>)[virtual] | mapeia `error_code` para `error_condition`
(função membro pública virtual)
[ equivalent](<#/doc/error/error_category/equivalent>)[virtual] | compara `error_code` e `error_condition` para equivalência
(função membro pública virtual)
[ message](<#/doc/error/error_category/message>)[virtual] | obtém a string explicativa
(função membro pública virtual)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_category/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara duas categorias de erro
(função)

### Categorias de erro específicas

[ generic_category](<#/doc/error/generic_category>)(C++11) | identifica a categoria de erro genérica
(função)
[ system_category](<#/doc/error/system_category>)(C++11) | identifica a categoria de erro do sistema operacional
(função)
[ iostream_category](<#/doc/io/iostream_category>)(C++11) | identifica a categoria de erro de iostream
(função)
[ future_category](<#/doc/thread/future_category>)(C++11) | identifica a categoria de erro de future
(função)

### Veja também

[ error_condition](<#/doc/error/error_condition>)(C++11) | mantém um código de erro portátil
(classe)
[ error_code](<#/doc/error/error_code>)(C++11) | mantém um código de erro dependente da plataforma
(classe)