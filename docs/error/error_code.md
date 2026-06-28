# std::error_code

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
class error_code;  // (desde C++11)
```

`std::error_code` representa um valor de código de erro dependente da plataforma. Cada objeto `std::error_code` armazena um valor de código de erro originado do sistema operacional ou de alguma interface de baixo nível e um ponteiro para um objeto do tipo [std::error_category](<#/doc/error/error_category>), que corresponde à referida interface. Os valores de código de erro não são obrigados a ser únicos entre diferentes categorias de erro.

### Funções membro

[ (construtor)](<#/doc/error/error_code/error_code>) | constrói um código de erro
(função membro pública)
[ operator=](<#/>) | atribui outro código de erro
(função membro pública)
[ assign](<#/doc/error/error_code/assign>) | atribui outro código de erro
(função membro pública)

##### Modificadores

[ clear](<#/doc/error/error_code/clear>) | define o `error_code` para o valor ​0​ em `system_category`
(função membro pública)

##### Observadores

[ value](<#/doc/error/error_code/value>) | obtém o valor do `error_code`
(função membro pública)
[ category](<#/doc/error/error_code/category>) | obtém a `error_category` para este `error_code`
(função membro pública)
[ default_error_condition](<#/doc/error/error_code/default_error_condition>) | obtém a `error_condition` para este `error_code`
(função membro pública)
[ message](<#/doc/error/error_code/message>) | obtém a string explicativa para este `error_code`
(função membro pública)
[ operator bool](<#/doc/error/error_code/operator_bool>) | verifica se o valor é diferente de zero
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=>](<#/doc/error/error_code/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara dois `error_code`s
(função)
[ operator<<](<#/doc/error/error_code/operator_ltlt>) | envia o valor e o nome da categoria para um output stream
(função)

### Classes auxiliares

[ is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)(C++11) | identifica uma classe como uma enumeração de `error_code`
(template de classe)
[ std::hash<std::error_code>](<#/doc/error/error_code/hash>)(C++11) | suporte a hash para `std::error_code`
(especialização de template de classe)

### Veja também

[ error_condition](<#/doc/error/error_condition>)(C++11) | armazena um código de erro portátil
(classe)
[ error_category](<#/doc/error/error_category>)(C++11) | classe base para categorias de erro
(classe)
[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) | cria um valor de código de erro para o enum `errc` e
(função)