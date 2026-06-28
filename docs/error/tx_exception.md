# std::tx_exception

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`

```c
template< class T >
class tx_exception : public std::runtime_error;
```

Define um tipo de exceção que pode ser usado para cancelar e reverter uma transação atômica iniciada pela palavra-chave [`atomic_cancel`](<#/doc/language/transactional_memory>).

Se `T` não for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), o programa que especializa `std::tx_exception<T>` é malformado.

### Funções membro

## std::tx_exception::tx_exception

explicit tx_exception( T value ) transaction_safe; | (1) | (TM TS)
---|---|---
tx_exception( T value, const [std::string](<#/doc/string/basic_string>)& what_arg ) transaction_safe; | (2) | (TM TS)
tx_exception( T value, const char* what_arg ) transaction_safe; | (3) | (TM TS)
tx_exception( const tx_exception& other ) transaction_safe noexcept; | (4) | (TM TS)

1-3) Constrói o objeto de exceção com `what_arg` como string explicativa que pode ser acessada através de `what()` e `value` como o objeto que pode ser acessado através de `get()`.

4) Construtor de cópia. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::tx_exception<T>`, então `[std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0`.

### Parâmetros

- **value** — objeto de payload
- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1-3) Pode lançar exceções definidas pela implementação.

## std::tx_exception::operator=

tx_exception& operator=( const tx_exception& other ) transaction_safe noexcept; | | (TM TS)

Atribui o conteúdo com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::tx_exception<T>`, então `[std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0` após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

`*this`

## std::tx_exception::get

T get() const transaction_safe; | | (TM TS)

Retorna o objeto de payload mantido pelo objeto de exceção.

### Exceções

Pode lançar exceções definidas pela implementação.

## std::tx_exception::what

virtual const char* what() const transaction_safe_dynamic noexcept; | | (TM TS)

Retorna a string explicativa.

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para uma string terminada em nulo com informações explicativas.

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)