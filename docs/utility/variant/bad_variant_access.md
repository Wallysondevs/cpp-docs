# std::bad_variant_access

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
class bad_variant_access : public std::exception
```

`std::bad_variant_access` é o tipo da exceção lançada nas seguintes situações:

  * [`std::get(std::variant)`](<#/doc/utility/variant/get>) chamado com um índice ou tipo que não corresponde à alternativa atualmente ativa.
  * [`std::visit`](<#/doc/utility/variant/visit2>) chamado para visitar uma variant que está [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>).
  * [`std::variant::visit`](<#/doc/utility/variant/visit>) chamado para visitar uma variant que está [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>).

| (desde C++26)

### Funções membro

(construtor) | constrói um novo objeto `bad_variant_access`
(função membro pública)
operator= | substitui o objeto `bad_variant_access`
(função membro pública)
what | retorna a string explicativa
(função membro pública)

## std::bad_variant_access::bad_variant_access

```cpp
bad_variant_access() noexcept;  // (1) (desde C++17)
bad_variant_access( const bad_variant_access& other ) noexcept;  // (2) (desde C++17)
```

Constrói um novo objeto `bad_variant_access` com uma string de bytes terminada em nulo definida pela implementação, que é acessível através de [`what()`](<#/doc/error/exception/what>).

1) Construtor padrão.

2) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::bad_variant_access`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **other** — outro objeto de exceção para copiar

## std::bad_variant_access::operator=

```cpp
bad_variant_access& operator=( const bad_variant_access& other ) noexcept;  // (desde C++17)
```

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::bad_variant_access`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

## std::bad_variant_access::what

```cpp
virtual const char* what() const noexcept;  // (desde C++17)
```
---|---|

Retorna a string explicativa.

### Valor de retorno

Ponteiro para uma string terminada em nulo definida pela implementação com informações explicativas. A string é adequada para conversão e exibição como uma [std::wstring](<#/doc/string/basic_string>). O ponteiro é garantido como válido pelo menos até que o objeto de exceção do qual ele é obtido seja destruído, ou até que uma função membro não-const (por exemplo, operador de atribuição de cópia) no objeto de exceção seja chamada.

A string retornada é codificada com a codificação literal ordinária durante a avaliação constante. | (desde C++26)

### Notas

As implementações são permitidas, mas não obrigadas, a sobrescrever `what()`.

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <variant>
    
    int main()
    {
        std::variant<int, float> v;
        v = 12;
        try
        {
            std::get<float>(v);
        }
        catch (const std::bad_variant_access& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível:
```
    bad_variant_access
```

### Veja também

[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(function template)
[ visit](<#/doc/utility/variant/visit2>)(C++17) | chama o functor fornecido com os argumentos contidos por uma ou mais `variant`s
(function template)
[ visit](<#/doc/utility/variant/visit>)(C++26) | chama o functor fornecido com o argumento contido pela `variant`
(função membro pública)