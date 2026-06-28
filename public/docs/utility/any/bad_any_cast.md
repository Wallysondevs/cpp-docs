# std::bad_any_cast

Definido no cabeçalho `[<any>](<#/doc/header/any>)`

```c
class bad_any_cast : public std::bad_cast;
```

Define um tipo de objeto a ser lançado pelas formas de retorno de valor de [std::any_cast](<#/doc/utility/any/any_cast>) em caso de falha.

### Funções membro

(construtor) | constrói um novo objeto `bad_any_cast`
(função membro pública)
operator= | substitui o objeto `bad_any_cast`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_any_cast::bad_any_cast

```cpp
bad_any_cast() noexcept;  // (1) (desde C++17)
bad_any_cast( const bad_any_cast& other ) noexcept;  // (2) (desde C++17)
```

Constrói um novo objeto `bad_any_cast` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_any_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_any_cast::operator=

```cpp
bad_any_cast& operator=( const bad_any_cast& other ) noexcept;  // (desde C++17)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_any_cast`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_any_cast::what

```cpp
virtual const char* what() const noexcept;  // (desde C++17)
```

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) seja chamada no objeto de exceção.

A string retornada é codificada com a codificação literal ordinária durante a avaliação de constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::bad_cast](<#/doc/types/bad_cast>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <cassert>
    #include <print>
    
    int main()
    {
        auto x = std::any(42);
        assert(std::any_cast<int>(x) == 42); // OK
    
        try
        {
            [[maybe_unused]] auto s = std::any_cast<std::string>(x); // throws
        }
        catch (const std::bad_any_cast& ex)
        {
            std::println("{}", ex.what());
        }
    }
```

Saída possível:
```
    bad any_cast
```