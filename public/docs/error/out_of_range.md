# std::out_of_range

Definido no header `[<stdexcept>](<#/doc/header/stdexcept>)`

```cpp
class out_of_range;
```

Define um tipo de objeto a ser lançado como exceção. Ele reporta erros que são consequência de uma tentativa de acessar elementos fora do range definido.

Pode ser lançada pelas funções membro de [std::bitset](<#/doc/utility/bitset>) e [std::basic_string](<#/doc/string/basic_string>), pelas famílias de funções [std::stoi](<#/doc/string/basic_string/stol>) e [std::stod](<#/doc/string/basic_string/stof>), e pelas funções membro de acesso com verificação de limites (por exemplo, [std::vector::at](<#/doc/container/vector/at>) e [std::map::at](<#/doc/container/map/at>)).

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `out_of_range` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `out_of_range`
(função membro pública)

## std::out_of_range::out_of_range

```cpp
out_of_range( const std::string& what_arg );  // (1)
out_of_range( const char* what_arg );  // (2)
out_of_range( const out_of_range& other ); | (3) | (noexcept desde C++11)
```

1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::out_of_range`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Notas

Como a cópia de `std::out_of_range` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. É também por isso que não existe um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>).

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::out_of_range::operator=

out_of_range& operator=( const out_of_range& other ); | | (noexcept desde C++11)

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::out_of_range`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [std::logic_error](<#/doc/error/logic_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

A condição de erro padrão [std::errc::result_out_of_range](<#/doc/error/errc>) tipicamente indica a condição onde o resultado, em vez da entrada, está fora do range, e está mais intimamente relacionada a [std::range_error](<#/doc/error/range_error>) e [ERANGE](<#/doc/error/errno_macros>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98 | o construtor que aceita const char* estava faltando | adicionado
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | as strings explicativas das cópias de `std::out_of_range` eram definidas pela implementação | elas são as mesmas do objeto `std::out_of_range` original

### Veja também

[ at](<#/doc/string/basic_string/at>) | acessa o caractere especificado com verificação de limites
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ at](<#/doc/string/basic_string_view/at>) | acessa o caractere especificado com verificação de limites
(função membro pública de `std::basic_string_view<CharT,Traits>`)
[ at](<#/doc/container/deque/at>) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::deque<T,Allocator>`)
[ at](<#/doc/container/map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::map<Key,T,Compare,Allocator>`)
[ at](<#/doc/container/unordered_map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::unordered_map<Key,T,Hash,KeyEqual,Allocator>`)
[ at](<#/doc/container/vector/at>) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::vector<T,Allocator>`)
[ at](<#/doc/container/array/at>) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::array<T,N>`)
[ at](<#/doc/container/span/at>)(C++26) | acessa o elemento especificado com verificação de limites
(função membro pública de `std::span<T,Extent>`)