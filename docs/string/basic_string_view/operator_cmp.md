# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::basic_string_view)

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
template< class CharT, class Traits >
constexpr bool operator==( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr bool operator==(
std::basic_string_view<CharT,Traits> lhs,
std::type_identity_t<std::basic_string_view<CharT,Traits>> rhs ) noexcept;
template< class CharT, class Traits >
constexpr bool operator!=( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr bool operator<( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr bool operator<=( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr bool operator>( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr bool operator>=( std::basic_string_view<CharT,Traits> lhs,
std::basic_string_view<CharT,Traits> rhs ) noexcept;
(até C++20)
template< class CharT, class Traits >
constexpr /*comp-cat*/ operator<=>(
std::basic_string_view<CharT,Traits> lhs,
std::type_identity_t<std::basic_string_view<CharT,Traits>> rhs ) noexcept;
```

Compara duas views.

Todas as comparações são feitas através da função membro [compare()](<#/doc/string/basic_string_view/compare>) (que por sua vez é definida em termos de `Traits::compare()`):

  * Duas views são iguais se o tamanho de `lhs` e `rhs` forem iguais e cada caractere em `lhs` tiver um caractere equivalente em `rhs` na mesma posição.

  * As comparações de ordenação são feitas lexicograficamente – a comparação é realizada por uma função equivalente a [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>).

```cpp
A implementação fornece sobrecargas `constexpr` e `noexcept` adicionais suficientes dessas funções para que um objeto `basic_string_view<CharT,Traits>` `sv` possa ser comparado a outro objeto `t` com uma conversão implícita para `basic_string_view<CharT,Traits>`, com semântica idêntica à comparação de `sv` e `basic_string_view<CharT,Traits>(t)`.  // (até C++20)
O tipo de retorno dos operadores de comparação de três vias (/*comp-cat*/) é `Traits::comparison_category` se esse qualified-id denotar um tipo, `std::weak_ordering` caso contrário. Se /*comp-cat*/ não for um tipo de categoria de comparação, o programa é malformado. Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de `operator<=>` e `operator==` respectivamente.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — views para comparar

### Valor de retorno

1-6) `true` se a comparação correspondente for verdadeira, `false` caso contrário.

7) `static_cast</*comp-cat*/>(lhs.compare(rhs) <=> 0)`.

### Complexidade

Linear no tamanho das views.

### Notas

Sobrecargas adicionais suficientes podem ser implementadas através de contexto não deduzido em um tipo de parâmetro. | (até C++20)
---|---
O tipo de resultado da comparação de três vias de [std::string_view](<#/doc/string/basic_string_view>), [std::wstring_view](<#/doc/string/basic_string_view>), [std::u8string_view](<#/doc/string/basic_string_view>), [std::u16string_view](<#/doc/string/basic_string_view>) e [std::u32string_view](<#/doc/string/basic_string_view>) é `std::strong_ordering`. `std::type_identity_t` é usado para contexto não deduzido, o que torna argumentos implicitamente conversíveis para o tipo string view comparáveis com a string view. | (desde C++20)

### Exemplo

Execute este código
```cpp
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
    
        static_assert(""sv == ""sv);
    
        static_assert(""sv == "", "Seleciona uma sobrecarga adicional até C++20.");
    
        static_assert("" == ""sv, "Seleciona uma sobrecarga adicional até C++20."
                                  "Usa um candidato reescrito desde C++20.");
    
        static_assert(!(""sv != ""sv), "Usa o candidato reescrito desde C++20.");
    
        static_assert(!(""sv != ""), "Seleciona uma sobrecarga adicional até C++20;"
                                     "Usa um candidato reescrito desde C++20.");
    
        static_assert(!("" != ""sv), "Seleciona uma sobrecarga adicional até C++20."
                                     "Usa um candidato reescrito desde C++20.");
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3432](<https://cplusplus.github.io/LWG/issue3432>) | C++20 | o tipo de retorno de `operator<=>` não era exigido ser um tipo de categoria de comparação | exigido
[LWG 3950](<https://cplusplus.github.io/LWG/issue3950>) | C++20 | sobrecargas adicionais redundantes ainda eram exigidas | conjuntos de sobrecarga reduzidos