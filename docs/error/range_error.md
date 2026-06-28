# std::range_error

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`

```c
class range_error;
```

Define um tipo de objeto a ser lançado como exceção. Pode ser usado para relatar erros de range (isto é, situações onde o resultado de uma computação não pode ser representado pelo tipo de destino).

Os únicos componentes da standard library que lançam esta exceção são [std::wstring_convert::from_bytes](<#/doc/locale/wstring_convert/from_bytes>) e [std::wstring_convert::to_bytes](<#/doc/locale/wstring_convert/to_bytes>).

As funções matemáticas nos componentes da standard library não lançam esta exceção (funções matemáticas relatam erros de range conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>)).

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `range_error` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `range_error`
(função membro pública)

## std::range_error::range_error

```cpp
range_error( const std::string& what_arg );  // (1)
range_error( const char* what_arg );  // (2)
range_error( const range_error& other ); | (3) | (noexcept desde C++11)
```

1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::range_error` então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Notas

Como a cópia de `std::range_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. Esta é também a razão pela qual não existe um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-de-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso torna a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>).

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::range_error::operator=

range_error& operator=( const range_error& other ); | | (noexcept desde C++11)

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::range_error` então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98 | o construtor que aceita const char* estava faltando | adicionado
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | as strings explicativas das cópias de `std::range_error` eram definidas pela implementação | elas são as mesmas que as do objeto `std::range_error` original