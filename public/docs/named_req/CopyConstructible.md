# Requisitos nomeados C++: CopyConstructible

Especifica que uma instância do tipo pode ser construída por cópia a partir de uma [expressão lvalue](<#/doc/language/value_category>).

### Requisitos

O tipo `T` satisfaz CopyConstructible se

* O tipo `T` satisfaz [MoveConstructible](<#/doc/named_req/MoveConstructible>), e

Dado

* v, uma [expressão lvalue](<#/doc/language/value_category>) do tipo `T` ou const T ou uma [expressão rvalue](<#/doc/language/value_category>) do tipo const T,
* u, um identificador arbitrário.

As seguintes expressões devem ser válidas e ter seus efeitos especificados:

Expressão | Pós-condições
---|---
T u = v; | O valor de u é equivalente ao valor de v. O valor de v permanece inalterado.
T(v) | O valor de T(v) é equivalente ao valor de v. O valor de v permanece inalterado.
A expressão v.~T() também deve ser válida e, para um lvalue v, a expressão &v deve ter o tipo `T*` ou const T* e deve ser avaliada para o endereço de v. | (até C++11)

### Notas

Até C++11, classes que sobrecarregavam operator& não eram CopyConstructible e, portanto, não eram utilizáveis nos [containers da biblioteca padrão](<#/doc/container>). Esta é uma decisão de design no C++98 (em vez de um defeito, veja [LWG issue 390](<https://cplusplus.github.io/LWG/issue390>)).

Desde C++11, a biblioteca padrão usa [std::addressof](<#/doc/memory/addressof>) sempre que o endereço de um objeto é necessário.

Conteúdo estendido
---
Ser uma classe CopyConstructible implica [std::is_copy_constructible](<#/doc/types/is_copy_constructible>) mas não o contrário, já que [std::is_copy_constructible](<#/doc/types/is_copy_constructible>) apenas verificará a capacidade de chamar o construtor com os argumentos corretos, e, por exemplo, não um requisito [MoveConstructible](<#/doc/named_req/MoveConstructible>). Execute este código
```cpp
#include <type_traits>
#include <utility>

struct S
{
    S() = default;
    S(S&&) = delete;
    S(const S&) = default;
};
static_assert(std::is_copy_constructible_v<S>);

int main()
{
    S s1;

    // A classe `S` não satisfaz o requisito MoveConstructible,
    // portanto, não satisfaz o requisito CopyConstructible
    [[maybe_unused]] S s2{std::move(s1)}; // malformado, uso de função deletada
}
```

### Referências

Conteúdo estendido
---

* Padrão C++23 (ISO/IEC 14882:2024):

* 16.4.4.2 Requisitos de argumento de template [utility.arg.requirements]

### Veja também

[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(modelo de classe)
[ copy_constructible](<#/doc/concepts/copy_constructible>)(C++20) | especifica que um objeto de um tipo pode ser construído por cópia e construído por movimento
(concept)
*[_(as is)_]: A::pointer