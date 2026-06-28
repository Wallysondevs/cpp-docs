# std::negation

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class B >
struct negation;
```

Forma a [negação lógica](<https://en.wikipedia.org/wiki/Negation> "enwiki:Negation") do type trait B.

O tipo std::negation&lt;B&gt; é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com uma característica base de [std::bool_constant](<#/doc/types/integral_constant>)<!bool(B::value)>.

Se o programa adicionar especializações para `std::negation` ou `std::negation_v`, o comportamento é indefinido.

### Parâmetros de template

- **B** — qualquer tipo tal que a expressão bool(B::value) seja uma expressão constante válida

### Template de variável auxiliar

```cpp
template< class B >
constexpr bool negation_v = negation<B>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `B` tiver um membro ::value que é false quando explicitamente convertido para bool, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Implementação possível
```cpp
    template<class B>
    struct negation : std::bool_constant<!bool(B::value)> { };
```

---

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_logical_traits`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | [Type traits de operadores lógicos](<#/doc/meta>)

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(
        std::is_same<
            std::bool_constant<false>,
            typename std::negation<std::bool_constant<true>>::type>::value,
        "");
    static_assert(
        std::is_same<
            std::bool_constant<true>,
            typename std::negation<std::bool_constant<false>>::type>::value,
        "");
    
    static_assert(std::negation_v<std::bool_constant<true>> == false);
    static_assert(std::negation_v<std::bool_constant<false>> == true);
    
    int main() {}
```

### Veja também

[ conjunction](<#/doc/types/conjunction>)(C++17) | metafunção AND lógica variádica
(template de classe)
[ disjunction](<#/doc/types/disjunction>)(C++17) | metafunção OR lógica variádica
(template de classe)
[ integral_constantbool_constant](<#/doc/types/integral_constant>)(C++11)(C++17) | constante em tempo de compilação de tipo especificado com valor especificado
(template de classe)