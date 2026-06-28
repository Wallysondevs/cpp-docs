# std::is_signed

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_signed;
```

`std::is_signed` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo aritmético com sinal.

*   Se [std::is_arithmetic](<#/doc/types/is_arithmetic>)&lt;T&gt;::value for true, fornece a constante membro `value` igual a T(-1) < T(0).
*   Caso contrário, fornece a constante membro `value` igual a false.

Se o programa adicionar especializações para `std::is_signed` ou `std::is_signed_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_signed_v = is_signed<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo aritmético com sinal, false caso contrário
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

### Possível implementação
```cpp
    namespace detail
    {
        template<typename T, bool = std::is_arithmetic<T>::value>
        struct is_signed : std::integral_constant<bool, T(-1) < T(0)> {};
    
        template<typename T>
        struct is_signed<T, false> : std::false_type {};
    }
    
    template<typename T>
    struct is_signed : detail::is_signed<T>::type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    class A {};
    static_assert(std::is_signed_v<A> == false);
    
    class B { int i; };
    static_assert(std::is_signed_v<B> == false);
    
    enum C : int {};
    static_assert(std::is_signed_v<C> == false);
    
    enum class D : int {};
    static_assert(std::is_signed_v<D> == false);
    
    static_assert
    (
        std::is_signed<signed int>::value == true and // C++11
        std::is_signed<signed int>() == true and      // C++11
        std::is_signed<signed int>{} == true and      // C++11
        std::is_signed_v<signed int> == true and      // C++17
        std::is_signed_v<unsigned int> == false and
        std::is_signed_v<float> == true and
        std::is_signed_v<bool> == false and
        std::is_signed_v<signed char> == true and
        std::is_signed_v<unsigned char> == false
    );
    
    int main()
    {
        // signedness of char is implementation-defined:
        std::cout << std::boolalpha << std::is_signed_v<char> << '\n';
    }
```

Saída possível:
```
    true
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2197](<https://cplusplus.github.io/LWG/issue2197>) | C++11 | `value` poderia ser true mesmo se `T` não fosse um tipo aritmético | só pode ser false neste caso

### Ver também

[ is_unsigned](<#/doc/types/is_unsigned>)(C++11) | verifica se um tipo é um tipo aritmético sem sinal
(modelo de classe)
[ is_signed](<#/doc/types/numeric_limits/is_signed>)[static] | identifica tipos com sinal
(constante membro estática pública de `std::numeric_limits<T>`)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(modelo de classe)
[ make_signed](<#/doc/types/make_signed>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(modelo de classe)
[ make_unsigned](<#/doc/types/make_unsigned>)(C++11) | obtém o tipo sem sinal correspondente para o tipo integral fornecido
(modelo de classe)