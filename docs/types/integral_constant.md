# std::integral_constant

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, T v >
struct integral_constant;
```

`std::integral_constant` encapsula uma constante estática de um tipo especificado. É a classe base para os type traits do C++.

Se o programa adicionar especializações para `std::integral_constant`, o comportamento é indefinido.

### Alias templates auxiliares

Um alias template auxiliar `std::bool_constant` é definido para o caso comum em que `T` é bool.

```cpp
template< bool B >
using bool_constant = integral_constant<bool, B>;  // (desde C++17)
```

### Especializações

Dois typedefs para o caso comum em que `T` é bool são fornecidos:

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`
---
Nome | Definição
---|---
`true_type` | std::integral_constant<bool, true>
`false_type` | std::integral_constant<bool, false>

### Tipos de membros

Nome | Definição
---|---
`value_type` | T
`type` | std::integral_constant<T, v>

### Constantes de membros

Nome | Valor
---|---
constexpr T value[static] | v
(constante de membro estática pública)

### Funções de membros

** operator value_type** | retorna o valor encapsulado
(função de membro pública)
** operator()**(C++14) | retorna o valor encapsulado
(função de membro pública)

## std::integral_constant::operator value_type

constexpr operator value_type() const noexcept;

Função de conversão. Retorna o valor encapsulado.

## std::integral_constant::operator()

```cpp
constexpr value_type operator()() const noexcept;  // (desde C++14)
```

Retorna o valor encapsulado. Esta função permite que `std::integral_constant` sirva como uma fonte de objetos de função em tempo de compilação.

### Possível implementação
```cpp
    template<class T, T v>
    struct integral_constant
    {
        static constexpr T value = v;
        using value_type = T;
        using type = integral_constant; // using injected-class-name
        constexpr operator value_type() const noexcept { return value; }
        constexpr value_type operator()() const noexcept { return value; } // since c++14
    };
```

---

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_integral_constant_callable`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | `std::integral_constant::operator()`
[`__cpp_lib_bool_constant`](<#/doc/feature_test>) | [`201505L`](<#/>) | (C++17) | `std::bool_constant`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    using two_t = std::integral_constant<int, 2>;
    using four_t = std::integral_constant<int, 4>;
    
    static_assert(not std::is_same_v<two_t, four_t>);
    static_assert(two_t::value * 2 == four_t::value, "2*2 != 4");
    static_assert(two_t() << 1 == four_t() >> 0, "2*2 != 4");
    
    enum class E{ e1, e2 };
    using c1 = std::integral_constant<E, E::e1>;
    using c2 = std::integral_constant<E, E::e2>;
    static_assert(c1::value != E::e2);
    static_assert(c1() == E::e1);
    static_assert(std::is_same_v<c2, c2>);
    
    int main() {}
```

### Veja também

[ integer_sequence](<#/doc/utility/integer_sequence>)(C++14) | implementa sequência de inteiros em tempo de compilação
(modelo de classe)