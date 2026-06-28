# std::experimental::bad_any_cast

Definido no cabeçalho `[<experimental/any>](<#/doc/header/experimental/any>)`

```c
class bad_any_cast : public std::bad_cast;
```

Define um tipo de objeto a ser lançado pelas formas de retorno de valor de [std::experimental::any_cast](<#/doc/experimental/any/any_cast>) em caso de falha.

### Funções membro

(construtor) | constrói um novo objeto `bad_any_cast`
(função membro pública)
operator= | substitui o objeto `bad_any_cast`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::experimental::bad_any_cast::bad_any_cast

bad_any_cast() noexcept; | (1) | (library fundamentals TS)
---|---|---
bad_any_cast( const bad_any_cast& other ) noexcept; | (2) | (library fundamentals TS)

Constrói um novo objeto `bad_any_cast` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::experimental::bad_any_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::experimental::bad_any_cast::operator=

bad_any_cast& operator=( const bad_any_cast& other ) noexcept; | | (library fundamentals TS)

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::experimental::bad_any_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::experimental::bad_any_cast::what

virtual const char* what() const noexcept; | | (library fundamentals TS)

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal ordinária durante a avaliação constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::bad_cast](<#/doc/types/bad_cast>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)