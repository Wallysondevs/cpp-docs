# std::is_literal_type

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_literal_type;
(obsoleto em C++17)
(removido em C++20)
```

`std::is_literal_type` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

(Este type trait foi obsoleto[1](<#/doc/types/is_literal_type>) e removido[2](<#/doc/types/is_literal_type>) por oferecer valor insignificante ao código genérico.)

Se `T` satisfaz todos os requisitos de [LiteralType](<#/doc/named_req/LiteralType>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; é um tipo incompleto e não (possivelmente cv-qualificado) void, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_literal_type` ou `std::is_literal_type_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_literal_type_v = is_literal_type<T>::value;  // (desde C++17)
(obsoleto)
(removido em C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo literal, false caso contrário
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

### Notas

Apenas tipos literais podem ser usados como parâmetros ou retornados de [constexpr functions](<#/doc/language/constexpr>). Apenas classes literais podem ter funções membro constexpr.

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_literal_type_v<A> == true);
    
    struct B { virtual ~B(); };
    static_assert(std::is_literal_type_v<B> == false);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | `T` poderia ser um array de tipo de classe incompleto com limite desconhecido | o comportamento é indefinido neste caso

### Links externos

1. [↑](<#/doc/types/is_literal_type>) Alisdair Meredith. ["Deprecate the `is_literal` Trait"](<http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html#2.3>). [_Deprecating Vestigial Library Parts in C++17_](<http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html>). "O type trait `is_literal` oferece valor insignificante ao código genérico, pois o que é realmente necessário é a capacidade de saber que uma construção específica produziria inicialização constante."
2. [↑](<#/doc/types/is_literal_type>) Alisdair Meredith, Stephan T. Lavavej, Tomasz Kamiński. ["Deprecated type traits"](<http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html#3.12>). [_Reviewing Deprecated Facilities of C++17 for C++20_](<http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html>). "**Recomendação forte:** Remova os traits que podem continuar como zumbis. [...] **Revisão de Toronto:** Aceitar recomendação forte, remover do C++20."

---