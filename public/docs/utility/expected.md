# std::expected

Definido no cabeçalho `[<expected>](<#/doc/header/expected>)`

```c
template< class T, class E >
class expected;
template< class T, class E >
requires std::is_void_v<T>
class expected<T, E>;
```

O template de classe `std::expected` fornece uma maneira de representar um de dois valores: um valor _esperado_ do tipo `T`, ou um valor _inesperado_ do tipo `E`. `std::expected` nunca é sem valor.

1) O template principal. Contém o valor esperado ou inesperado dentro de seu próprio armazenamento. Nenhuma alocação dinâmica de memória ocorre.

2) A especialização parcial para void. Representa um valor void esperado ou contém o valor inesperado dentro de seu próprio armazenamento. Nenhuma alocação dinâmica de memória ocorre.

Um programa é malformado se instanciar um `expected` com um tipo de referência, um tipo de função, ou uma especialização de [`std::unexpected`](<#/doc/utility/expected/unexpected>). Além disso, `T` não deve ser [std::in_place_t](<#/doc/utility/in_place>) ou [`std::unexpect_t`](<#/doc/utility/expected/unexpect_t>).

### Parâmetros do template

- **T** — o tipo do valor esperado. O tipo deve ser (possivelmente cv-qualificado) void, ou satisfazer os requisitos [Destructible](<#/doc/named_req/Destructible>) (em particular, tipos array e referência não são permitidos).
- **E** — o tipo do valor inesperado. O tipo deve satisfazer os requisitos [Destructible](<#/doc/named_req/Destructible>), e deve ser um argumento de template válido para [`std::unexpected`](<#/doc/utility/expected/unexpected>) (em particular, arrays, tipos não-objeto e tipos cv-qualificados não são permitidos).

### Tipos de membro

Tipo de membro | Definição
---|---
`value_type` | `T`
`error_type` | `E`
`unexpected_type` | [`std::unexpected<E>`](<#/doc/utility/expected/unexpected>)

### Templates de alias de membro

Tipo | Definição
---|---
rebind&lt;U&gt; | std::expected<U, error_type>

### Membros de dados

Membro | Definição
---|---
bool `_has_val_` | se o objeto `expected` representa atualmente o valor esperado (objeto membro apenas para exposição*)
`T` `_val_` (apenas no template principal) | o valor esperado (objeto membro variante apenas para exposição*)
`E` `_unex_` | o valor inesperado (objeto membro variante apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/utility/expected/expected>) | constrói o objeto `expected`
(função membro pública)
[ (destrutor)](<#/doc/utility/expected/~expected>) | destrói o objeto `expected`, juntamente com seu valor contido
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)

##### Observadores

[ operator->operator*](<#/doc/utility/expected/operator_star_>) | acessa o valor esperado
(função membro pública)
[ operator boolhas_value](<#/doc/utility/expected/operator_bool>) | verifica se o objeto contém um valor esperado
(função membro pública)
[ value](<#/doc/utility/expected/value>) | retorna o valor esperado
(função membro pública)
[ error](<#/doc/utility/expected/error>) | retorna o valor inesperado
(função membro pública)
[ value_or](<#/doc/utility/expected/value_or>) | retorna o valor esperado se presente, outro valor caso contrário
(função membro pública)
[ error_or](<#/doc/utility/expected/error_or>) | retorna o valor inesperado se presente, outro valor caso contrário
(função membro pública)

##### Operações monádicas

[ and_then](<#/doc/utility/expected/and_then>) | retorna o resultado da função dada sobre o valor esperado se ele existir; caso contrário, retorna o próprio `expected`
(função membro pública)
[ transform](<#/doc/utility/expected/transform>) | retorna um `expected` contendo o valor esperado transformado se ele existir; caso contrário, retorna o próprio `expected`
(função membro pública)
[ or_else](<#/doc/utility/expected/or_else>) | retorna o próprio `expected` se ele contiver um valor esperado; caso contrário, retorna o resultado da função dada sobre o valor inesperado
(função membro pública)
[ transform_error](<#/doc/utility/expected/transform_error>) | retorna o próprio `expected` se ele contiver um valor esperado; caso contrário, retorna um `expected` contendo o valor inesperado transformado
(função membro pública)

##### Modificadores

[ emplace](<#/doc/utility/expected/emplace>) | constrói o valor esperado no local
(função membro pública)
[ swap](<#/doc/utility/expected/swap>) | troca os conteúdos
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/utility/expected/operator_cmp>)(C++23) | compara objetos `expected`
(template de função)
[ swap(std::expected)](<#/doc/utility/expected/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Classes auxiliares

[ unexpected](<#/doc/utility/expected/unexpected>)(C++23) | representado como um valor inesperado
(template de classe)
[ bad_expected_access](<#/doc/utility/expected/bad_expected_access>)(C++23) | exceção indicando acesso verificado a um `expected` que contém um valor inesperado
(template de classe)
[ unexpectunexpect_t](<#/doc/utility/expected/unexpect_t>)(C++23) | tag de construção in-place para valor inesperado em `expected`
(tag)

### Notas

Tipos com a mesma funcionalidade são chamados [`Result`](<https://doc.rust-lang.org/std/result/enum.Result.html>) em Rust e [`Either`](<https://hackage.haskell.org/package/base-4.17.0.0/docs/Data-Either.html>) em Haskell.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_expected`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | template de classe `std::expected` e [classes auxiliares](<#/doc/utility/expected>) associadas
[`202211L`](<#/>) | (C++23) | Funções monádicas para `std::expected`

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <expected>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    enum class parse_error
    {
        invalid_input,
        overflow
    };
    
    auto parse_number(std::string_view& str) -> std::expected<double, parse_error>
    {
        const char* begin = str.data();
        char* end;
        double retval = std::strtod(begin, &end);
    
        if (begin == end)
            return std::unexpected(parse_error::invalid_input);
        else if (std::isinf(retval))
            return std::unexpected(parse_error::overflow);
    
        str.remove_prefix(end - begin);
        return retval;
    }
    
    int main()
    {
        auto process = 
        {
            std::cout << "str: " << std::quoted(str) << ", ";
            if (const auto num = parse_number(str); num.has_value())
                std::cout << "value: " << *num << '\n';
                // Se num não tivesse um valor, desreferenciar num
                // causaria um comportamento indefinido, e
                // num.value() lançaria std::bad_expected_access.
                // num.value_or(123) usa o valor padrão especificado 123.
            else if (num.error() == parse_error::invalid_input)
                std::cout << "error: invalid input\n";
            else if (num.error() == parse_error::overflow)
                std::cout << "error: overflow\n";
            else
                std::cout << "unexpected!\n"; // ou invocar std::unreachable();
        };
    
        for (auto src : {"42", "42abc", "meow", "inf"})
            process(src);
    }
```

Output:
```
    str: "42", value: 42
    str: "42abc", value: 42
    str: "meow", error: invalid input
    str: "inf", error: overflow
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 22.8 Objetos Expected [expected]

### Veja também

[ variant](<#/doc/utility/variant>)(C++17) | uma união discriminada type-safe
(template de classe)
[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(template de classe)