# std::assignable_from

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class LHS, class RHS >
concept assignable_from =
std::is_lvalue_reference_v<LHS> &&
std::common_reference_with<
const std::remove_reference_t<LHS>&,
const std::remove_reference_t<RHS>&> &&
requires(LHS lhs, RHS&& rhs) {
{ lhs = std::forward<RHS>(rhs) } -> std::same_as<LHS>;
};
```

O concept `assignable_from<LHS, RHS>` especifica que uma expressão do tipo e categoria de valor especificados por `RHS` pode ser atribuída a uma expressão lvalue cujo tipo é especificado por `LHS`.

### Requisitos semânticos

Dado

  * `lhs`, um lvalue que se refere a um objeto `lcopy` tal que decltype((lhs)) é `LHS`,
  * `rhs`, uma expressão tal que decltype((rhs)) é `RHS`,
  * `rcopy`, um objeto distinto que é igual a `rhs`,

`assignable_from<LHS, RHS>` é modelado somente se

  * [std::addressof](<#/doc/memory/addressof>)(lhs = rhs) == [std::addressof](<#/doc/memory/addressof>)(lcopy) (ou seja, a expressão de atribuição resulta em um lvalue que se refere ao operando esquerdo);
  * Após avaliar lhs = rhs:
    * `lhs` é igual a `rcopy`, a menos que `rhs` seja um xvalue não-const que se refere a `lcopy` (ou seja, a atribuição é uma auto-atribuição por movimento);
    * se `rhs` for um glvalue:
      * Se for um xvalue não-const, o objeto ao qual ele se refere está em um estado válido, mas não especificado;
      * Caso contrário, o objeto ao qual ele se refere não é modificado;

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Notas

A atribuição não precisa ser uma função total. Em particular, se atribuir a algum objeto `x` pode fazer com que algum outro objeto `y` seja modificado, então x = y provavelmente não está no domínio de `=`. Isso geralmente acontece se o operando direito é possuído direta ou indiretamente pelo operando esquerdo (por exemplo, com smart pointers para nós em uma estrutura de dados baseada em nós, ou com algo como [std::vector](<#/doc/container/vector>)<[std::any](<#/doc/utility/any>)>).

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <concepts>
    #include <string>
    
    int main()
    {
        // Normal basic usage, checks lvalue reference assignment
        static_assert(std::is_assignable_v<int&, int>);
        static_assert(std::assignable_from<int&, int>);
    
        static_assert(std::is_assignable_v<std::string&, std::string>);
        static_assert(std::assignable_from<std::string&, std::string>);
    
        // Fundamental types don't support assignment to an rvalue
        static_assert(!std::is_assignable_v<int, int>);
        static_assert(!std::assignable_from<int, int>);
    
        // std::assignable_from doesn't accept all valid assignment expressions:
    
        // rvalue reference assignment
        static_assert(std::is_assignable_v<std::string&&, std::string>);
        static_assert(!std::assignable_from<std::string&&, std::string>);
    
        // rvalue assignment
        static_assert(std::is_assignable_v<std::string, std::string>);
        static_assert(!std::assignable_from<std::string, std::string>);
    
        // std::atomic::operator= returns by value
        static_assert(std::is_assignable_v<std::atomic<int>&, int>);
        static_assert(!std::assignable_from<std::atomic<int>&, int>);
    }
```

### Referências

  * C++23 padrão (ISO/IEC 14882:2024):

    

  * 18.4.8 Concept `assignable_from` [concept.assignable]

  * C++20 padrão (ISO/IEC 14882:2020):

    

  * 18.4.8 Concept `assignable_from` [concept.assignable]

### Veja também

[ is_assignableis_trivially_assignableis_nothrow_assignable](<#/doc/types/is_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição para um argumento específico
(class template)