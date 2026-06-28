# std::derived_from

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class Derived, class Base >
concept derived_from =
std::is_base_of_v<Base, Derived> &&
std::is_convertible_v<const volatile Derived*, const volatile Base*>;
```

O concept derived_from<Derived, Base> é satisfeito se e somente se `Base` for um tipo de classe que é `Derived` ou uma base pública e não ambígua de `Derived`, ignorando qualificadores cv.

Note que este comportamento é diferente de `std::is_base_of` quando `Base` é uma base privada ou protegida de `Derived`.

### Exemplo

Execute este código
```cpp
    #include <concepts>
    
    class A {};
    
    class B : public A {};
    
    class C : private A {};
    
    // std::derived_from == true somente para herança pública ou a mesma classe exata
    static_assert(std::derived_from<B, B> == true);      // mesma classe: true
    static_assert(std::derived_from<int, int> == false); // mesmo tipo primitivo: false
    static_assert(std::derived_from<B, A> == true);      // herança pública: true
    static_assert(std::derived_from<C, A> == false);     // herança privada: false
    
    // std::is_base_of == true também para herança privada
    static_assert(std::is_base_of_v<B, B> == true);      // mesma classe: true
    static_assert(std::is_base_of_v<int, int> == false); // mesmo tipo primitivo: false
    static_assert(std::is_base_of_v<A, B> == true);      // herança pública: true
    static_assert(std::is_base_of_v<A, C> == true);      // herança privada: true
    
    int main() {}
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.3 Concept `derived_from` [concept.derived]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.3 Concept `derived_from` [concept.derived]

### Veja também

[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é base do outro tipo
(modelo de classe)
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(modelo de classe)